# run.py
from api import create_app
from dotenv import load_dotenv
import os
from pathlib import Path

# 使用绝对路径加载环境文件
base_dir = Path(__file__).parent
env = os.getenv('FLASK_ENV', 'development')
env_file = base_dir / f'.env.{env}'
load_dotenv(str(env_file))

app = create_app()

if __name__ == '__main__':
    app.run(
        debug=os.getenv('FLASK_DEBUG', 'True').lower() == 'true',
        host=os.getenv('FLASK_HOST', '0.0.0.0'),
        port=int(os.getenv('FLASK_PORT', '8090'))
    )
