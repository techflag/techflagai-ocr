import importlib
import logging
import os
from pathlib import Path
from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_sqlalchemy import SQLAlchemy
from flask import send_from_directory, abort
from urllib.parse import unquote
import os
from config.mysqlConfig import MysqlConfig
from config.jwtConfig import JwtConfig
from config.otherConfig import OtherConfig
_config = OtherConfig()
# 初始化数据库
db = SQLAlchemy()

# 获取当前文件的目录
current_dir = os.path.dirname(os.path.abspath(__file__))
BLUEPRINTS_DIR = os.path.join('api')

def register_blueprints(app):
    """注册所有蓝图"""
    blueprints_files = [
        f[:-3] for f in os.listdir(BLUEPRINTS_DIR) 
        if f.endswith('Api.py') and not f.startswith('__')
    ]

    package = __name__.split('.')[0]
    for blueprint_file in blueprints_files:
        module_name = f'.{blueprint_file}'
        module = importlib.import_module(module_name, package=package)
        api_blueprint = getattr(module, 'api_blueprint', None)
        if api_blueprint:
            url_prefix = '/api' + (api_blueprint.url_prefix or '')
            app.register_blueprint(api_blueprint, url_prefix=url_prefix)

def setup_logging(app):
    """配置日志"""
    app.logger.setLevel(logging.DEBUG)
    handler = logging.StreamHandler()
    handler.setLevel(logging.DEBUG)
    app.logger.addHandler(handler)

def create_app():
    """创建并配置 Flask 应用"""
    # 确保在任何配置加载之前先加载环境变量
    
    # 创建 Flask 应用
    app = Flask(__name__)
    
    # 添加静态文件路由
    @app.route('/api/file/<path:filename>')
    def serve_static(filename):
       
        
        try:
            # 解码URL编码的路径
            decoded_filename = unquote(filename)
            # 拼接完整路径
            full_path = os.path.join(_config.FILE_PATH, decoded_filename)
            
            # 验证文件是否存在
            if not os.path.exists(full_path):
                app.logger.error(f"File not found: {full_path}")
                abort(404)
                
            return send_from_directory(_config.FILE_PATH, decoded_filename)
        except Exception as e:
            app.logger.error(f"Error serving file: {str(e)}")
            abort(500)
    
    # 加载配置
    app.config.from_object(MysqlConfig)
    app.config.from_object(JwtConfig)
    app.config.from_object(OtherConfig)
    
    # 初始化扩展
    db.init_app(app)
    CORS(app, resources={r"/*": {"origins": "*"}})
    
    # 设置日志
    setup_logging(app)
    
    # 注册蓝图
    register_blueprints(app)
    
    # 配置 JWT
    jwt = JWTManager(app)
    jwt.JWT_DEBUG = True
    app.jwt = jwt
    
    return app