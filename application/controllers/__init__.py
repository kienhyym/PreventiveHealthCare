from application.extensions import jinja


def init_controllers(app):
    import application.controllers.export_api

    @app.route('/')
    def index(request):
        return jinja.render('index.html', request)
