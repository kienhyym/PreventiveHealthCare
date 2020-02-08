from application.extensions import jinja


def init_controllers(app):
    import application.controllers.user_api
    import application.controllers.api
    import application.controllers.medicalform
    import application.controllers.export
    from application.controllers.export import exportbp
    app.blueprint(exportbp)

    @app.route('/')
    def index(request):
        return jinja.render('admin/index.html', request)
