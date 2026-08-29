from fastapi import BackgroundTasks, APIRouter
from starlette.responses import JSONResponse
from fastapi_mail import FastMail, MessageSchema, MessageType

from schemas.email import EmailSchema
from lib.email import conf

email_router = APIRouter()

@email_router.post("/send-email")
async def send_in_background(
    background_tasks: BackgroundTasks,
    email: EmailSchema
) -> JSONResponse:
    html = """<p>Press the verification button to verify your account!</p> """

    message = MessageSchema(
        subject="Fastapi mail module",
        recipients=email.email, 
        body=html,
        subtype=MessageType.plain
    )

    fm = FastMail(conf)
    background_tasks.add_task(fm.send_message, message)
    return JSONResponse(status_code=200, content={"message": "email has been sent"})
