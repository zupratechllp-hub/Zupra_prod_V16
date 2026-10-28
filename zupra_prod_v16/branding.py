"""Repository-backed branding context and root-route handling for Frappe."""


def update_website_context(context):
    return {"favicon": "/assets/zupra_prod_v16/images/logo.png"}


def redirect_desk_root():
    """Send browser visits to the bare site URL to the appropriate Frappe page.

    This deliberately applies only to ``/`` and safe browser methods. API,
    webhook, login, password-reset, verification, portal, and website routes
    therefore continue through Frappe's normal request handling.
    """
    import frappe
    from werkzeug.exceptions import HTTPException
    from werkzeug.utils import redirect

    request = frappe.request
    if request.path != "/" or request.method not in {"GET", "HEAD"}:
        return
 
    if not frappe.is_setup_complete():
        location = "/app/setup-wizard"
    elif frappe.session.user == "Guest":
        location = "/login"
    else:
        location = "/app"

    raise HTTPException(response=redirect(location, code=302))
