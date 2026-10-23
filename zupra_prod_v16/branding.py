"""Repository-backed branding context for Frappe website pages."""


def update_website_context(context):
    return {"favicon": "/assets/zupra_prod_v16/images/logo.png"}
def redirect_desk_root():
    import frappe
    from werkzeug.exceptions import HTTPException
    from werkzeug.utils import redirect
    if frappe.request.path.rstrip("/") == "/desk":
        raise HTTPException(response=redirect("/desk/setup/home", 302))
