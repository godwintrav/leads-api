from lead.model import Lead

default_leads = [
    Lead(company="Google", email="google@gmail.com", engaged=True, full_name="Vania Odenigbo", last_contacted="2025-01-19", stage=0),
    Lead(company="Artisan AI", email="artisan@gmail.com", engaged=False, full_name="Godwin Odenigbo", last_contacted="2025-03-19", stage=0),
    Lead(company="Open AI", email="open-ai@gmail.com", engaged=True, full_name="Godfrey Odenigbo", last_contacted="2025-04-19", stage=0),
    Lead(company="SKY UK", email="sky@gmail.com", engaged=False, full_name="Veronica Odenigbo", last_contacted="2025-05-19", stage=0),
    Lead(company="Digit Pay", email="digitpay@gmail.com", engaged=True, full_name="Okafor Odenigbo", last_contacted="2025-06-19", stage=1),
    Lead(company="Amazon", email="amazon@gmail.com", engaged=False, full_name="Jeff Bezos", last_contacted="2025-07-19", stage=1),
    Lead(company="Nvidia", email="nvidia@gmail.com", engaged=True, full_name="Pete Hegseth", last_contacted="2025-08-19", stage=1),
    Lead(company="Bua Cement", email="bua@gmail.com", engaged=False, full_name="Bua Trav", last_contacted="2025-09-19", stage=1),
    Lead(company="Ebit", email="ebit@gmail.com", engaged=True, full_name="Jami Cooper", last_contacted="2025-10-19", stage=2),
    Lead(company="Claude AI", email="claude@gmail.com", engaged=False, full_name="Jean Claude", last_contacted="2025-11-19", stage=2),
    Lead(company="Meta", email="meta@gmail.com", engaged=True, full_name="Mark Zuckerbeg", last_contacted="2025-12-19", stage=2),
    Lead(company="Mismo", email="mismo@gmail.com", engaged=False, full_name="Satya Meri", last_contacted="2026-01-19", stage=2),
    Lead(company="Blocverse", email="blocverse@gmail.com", engaged=True, full_name="TC", last_contacted="2026-03-19", stage=3),
    Lead(company="Tesla", email="tesla@gmail.com", engaged=False, full_name="Elon Musk", last_contacted="2026-04-19", stage=3),
    Lead(company="X.com", email="x@gmail.com", engaged=True, full_name="Jack Dorsey", last_contacted="2026-05-19", stage=3),
    Lead(company="Paypal", email="paypal@gmail.com", engaged=False, full_name="AI Man", last_contacted="2026-06-19", stage=3),
    Lead(company="AI Robotics", email="al-robotics@gmail.com", engaged=True, full_name="Alfred Bateman", last_contacted="2026-07-19", stage=4),
    Lead(company="Drone AI", email="drone@gmail.com", engaged=False, full_name="Ronie Coleman", last_contacted="2026-08-19", stage=4),
    Lead(company="Ford", email="ford@gmail.com", engaged=True, full_name="Jack Buffer", last_contacted="2026-09-19", stage=4),
    Lead(company="Mercedes", email="mercedes@gmail.com", engaged=False, full_name="Mercedes Maria", last_contacted="2026-10-19", stage=4),
]

def get_default_leads():
    return default_leads