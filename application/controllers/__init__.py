from application.extensions import jinja
from gatco.response import json

async def auth_func(request, **kw):
    pass

def init_controllers(app):
    import application.controllers.user_api
    import application.controllers.api
    
    import application.controllers.export
    from application.controllers.export import exportbp
    app.blueprint(exportbp)

    import application.controllers.nghingonhiembenhnhoma
    import application.controllers.medicalform

    @app.route('/')
    def index(request):
        return jinja.render('admin/index.html', request)

    @app.route('/_up')
    def up(request):
        return json({})
