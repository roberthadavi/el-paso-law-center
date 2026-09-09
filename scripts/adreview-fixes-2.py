import glob, re, json
R = [
 ("Contingency — no fee unless we recover", "Contingency — no attorney's fee unless we recover; client may be responsible for case expenses"),
 ("Contingencia — sin honorarios si no recuperamos", "Contingencia — sin honorarios de abogado si no recuperamos; el cliente puede ser responsable de los gastos del caso"),
 ("El Paso Personal Injury Lawyer — No Fee Unless We Recover", "El Paso Personal Injury Lawyer — No Attorney's Fee Unless We Recover"),
 ("Injury cases are contingency — no fee unless we recover. No hourly surprises.", "Injury cases are contingency — no attorney's fee unless we recover (case expenses may still apply). No hourly surprises."),
 ("Los casos de lesiones son por contingencia — sin honorarios a menos que recuperemos. Sin sorpresas por hora.", "Los casos de lesiones son por contingencia — sin honorarios de abogado a menos que recuperemos (pueden aplicar gastos del caso). Sin sorpresas por hora."),
 ("Personal injury cases are contingency — no fee unless we recover. Call (915) 526-0787 for a quote on your specific matter.", "Personal injury cases are handled on a contingency fee: no attorney's fee unless we recover money for you. If there is no recovery you owe no attorney's fee, although you may be responsible for case expenses such as court costs, records and expert fees, which we explain in writing before you sign. Call (915) 526-0787 for a quote on your specific matter."),
 ("Los casos de lesiones personales son por contingencia — sin honorarios a menos que recuperemos. Llame al (915) 526-0787 para una cotización de su asunto.", "Los casos de lesiones personales se manejan por contingencia: sin honorarios de abogado a menos que recuperemos dinero para usted. Si no hay recuperación no debe honorarios de abogado, aunque puede ser responsable de gastos del caso como costos de corte, expedientes y peritos, que explicamos por escrito antes de firmar. Llame al (915) 526-0787 para una cotización de su asunto."),
 ("no attorney fee unless we recover money for you.", "no attorney's fee unless we recover money for you, although you may be responsible for case expenses."),
 ("no hay honorarios de abogado a menos que recuperemos dinero para usted.", "no hay honorarios de abogado a menos que recuperemos dinero para usted, aunque puede ser responsable de los gastos del caso."),
 ("and charge nothing unless we recover.", "and charge no attorney's fee unless we recover."),
 ("y no cobramos a menos que recuperemos.", "y no cobramos honorarios de abogado a menos que recuperemos."),
 ("No fee unless we win.", "No attorney's fee unless we win."),
 ("Sin honorarios si no ganamos.", "Sin honorarios de abogado si no ganamos."),
 ("No fee unless we recover.", "No attorney's fee unless we recover."),
 ("no fee unless we recover.", "no attorney's fee unless we recover."),
 ("with no fee unless we recover", "with no attorney's fee unless we recover"),
 ("No fee unless we recover", "No attorney's fee unless we recover"),
 ("no fee unless we recover", "no attorney's fee unless we recover"),
 ("Sin honorarios si no recuperamos", "Sin honorarios de abogado si no recuperamos"),
 ("sin honorarios si no recuperamos", "sin honorarios de abogado si no recuperamos"),
 ("sin honorarios a menos que recuperemos", "sin honorarios de abogado a menos que recuperemos"),
]
n=0
for f in glob.glob('src/content/parts/*/*.json') + ['src/data/pages.ts']:
    s=open(f,encoding='utf8').read(); t=s
    for a,b in R: t=t.replace(a,b)
    if t!=s: open(f,'w',encoding='utf8').write(t); n+=1
print('edited',n)
