class MysqlConfig:
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root:5f8e6e1540a93ddf@47.99.148.195:3306/ocr_recovery'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ECHO = True
    SQLALCHEMY_ENGINE_OPTIONS = {'connect_args': {'init_command': "SET time_zone='+08:00';"}}


