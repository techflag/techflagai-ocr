import os
class OtherConfig:
    def __init__(self):
        self.reload_config()
    
    def reload_config(self):
        self.FILE_PATH = os.getenv('OCR_FILE_PATH', 'D:/project_data/ocr/file/')
        
        self.MODEL_PATH = os.getenv('OCR_MODEL_PATH', 'D:/project_data/ocr/model')
        
        self.TRAIN_DATA = os.getenv('OCR_TRAIN_DATA', 'D:/project_data/ocr/train_data/')
        
        self.INFERENCE_PATH = os.getenv('OCR_INFERENCE_PATH', 'D:/project_data/ocr/inference/')

        # Redis配置
        self.REDIS_CONFIG = {
            'host': os.getenv('REDIS_HOST', '127.0.0.1'),
            'port': int(os.getenv('REDIS_PORT', '6379')),
            'password': os.getenv('REDIS_PASSWORD', '')
        }


        self.DEFAULT_DATASET_ID = os.getenv('DEFAULT_DATASET_ID', 'f47ac10b58cc4372a5670e02b2c3d479')
    
        
   
