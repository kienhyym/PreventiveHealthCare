from application.extensions import jinja


def init_controllers(app):
    import application.controllers.export_api
    import application.controllers.medicalform
    import application.controllers.user_api
    @app.route('/')
    def index(request):
        return jinja.render('admin/index.html', request)
