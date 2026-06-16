import qrcode
import qrcode.image.svg
from config.config import settings

def generate_qrcode(data: str):
    factory = qrcode.image.svg.SvgPathImage
    img = qrcode.make(data, image_factory=factory)
    return img

generate_qrcode(f"{settings.ALLOWED_ORIGINS}/claim/")