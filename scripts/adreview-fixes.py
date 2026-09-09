import json, glob, re, sys
# 1) exact-phrase replacements (referral language + softening)
R = [
 ("and we coordinate with Mexican counsel when a Mexican entity is the counterparty.", "and we flag the Mexican-law issues the Mexican counterparty's own advisors will need to address."),
 ("y coordinamos con abogados mexicanos cuando la contraparte es una entidad mexicana.", "y señalamos los puntos de ley mexicana que los asesores de la contraparte deberán atender."),
 ("We coordinate with Mexican counsel when needed.", "We draft the Texas side of that clause."),
 ("Coordinamos con abogados mexicanos cuando es necesario.", "Nosotros redactamos el lado de Texas de esa cláusula."),
 ("For Mexican corporate filings or an S.A. de C.V., we coordinate with licensed Mexican counsel rather than practicing Mexican law ourselves.", "We do not practice Mexican law; Mexican corporate filings such as an S.A. de C.V. must be handled by a lawyer licensed in Mexico."),
 ("Para trámites corporativos en México o una S.A. de C.V., coordinamos con abogados mexicanos con licencia en lugar de ejercer derecho mexicano nosotros.", "No ejercemos derecho mexicano; los trámites corporativos en México, como una S.A. de C.V., deben ser manejados por un abogado con licencia en México."),
 ("We coordinate with a CPA and, where needed, Mexican counsel so the agreement works on both sides of the bridge.", "We draft the Texas agreement with those issues in mind and tell you which questions belong to your CPA or to a Mexican-licensed lawyer."),
 ("Coordinamos con un contador y, cuando se necesita, con abogados mexicanos para que el contrato funcione en ambos lados del puente.", "Redactamos el contrato de Texas con esos temas en mente y le decimos qué preguntas corresponden a su contador o a un abogado con licencia en México."),
 ("Mexican counsel can add protections under Mexican industrial property law when warranted.", "Protections under Mexican industrial property law are a matter of Mexican law and are outside the scope of our engagement."),
 ("Un abogado mexicano puede agregar protecciones bajo la ley de propiedad industrial de México cuando se justifica.", "Las protecciones bajo la ley de propiedad industrial de México son materia de derecho mexicano y quedan fuera del alcance de nuestro trabajo."),
 ("whether that is a demand letter response, negotiation or referral to litigation counsel.", "whether that is a demand letter response, negotiation, or a lawsuit answer that you would engage counsel for separately."),
 ("ya sea responder con una carta, negociar o referirlo a un abogado litigante.", "ya sea responder con una carta, negociar o contestar la demanda mediante un contrato de representación aparte."),
 ("If a response is needed, we can handle it or refer you to the right lawyer.", "If a response is needed, that is a separate engagement you decide on at the time."),
 ("Si se necesita una respuesta, podemos manejarla o referirlo al abogado adecuado.", "Si se necesita una respuesta, esa es una contratación aparte que usted decide en ese momento."),
 ("you then decide whether to hire us or another attorney for the response.", "you then decide how you want to respond."),
 ("usted decide entonces si nos contrata a nosotros o a otro abogado para la respuesta.", "usted decide entonces cómo desea responder."),
 ("we will say so and point you to a better fit.", "we will tell you so before you hire us."),
 ("se lo diremos y lo referiremos a alguien más adecuado.", "se lo diremos antes de que nos contrate."),
 ("Referral for certified Spanish translation when the receiving office requires it", "Guidance on whether the receiving office will require a certified Spanish translation"),
 ("Referencia para traducción certificada al español cuando la oficina receptora la exija", "Orientación sobre si la oficina receptora exigirá una traducción certificada al español"),
 ("and can refer you to a qualified translator in El Paso or Ciudad Juárez.", "and tell you what qualifications the translator will need to have."),
 ("y podemos referirlo a un traductor calificado en El Paso o Ciudad Juárez.", "y le decimos qué requisitos deberá cumplir el traductor."),
 ("Clients who spend significant time in Juárez may also want a Mexican document, and we can point you to the right professional there.", "Clients who spend significant time in Juárez may also want a Mexican document, which must be prepared under Mexican law by a professional licensed there."),
 ("Referral to an occupational license petition if a suspension is still running", "Occupational driver's license petition, quoted separately, if a suspension is still running"),
 # substantiation softening
 ("appearing daily in El Paso Municipal Court", "appearing regularly in El Paso Municipal Court"),
 ("compareciendo a diario en la Corte Municipal de El Paso", "compareciendo con regularidad en la Corte Municipal de El Paso"),
 ("More than a decade of daily work in the El Paso County courthouse", "More than a decade of regular work in the El Paso County courthouse"),
 ("Más de una década de trabajo diario en el juzgado del Condado de El Paso", "Más de una década de trabajo constante en el juzgado del Condado de El Paso"),
 ("Weekday messages get a same-day response;", "We respond promptly, usually the same business day;"),
 ("Los mensajes entre semana reciben respuesta el mismo día;", "Respondemos con prontitud, normalmente el mismo día hábil;"),
 ("Weekday messages get a same-day response. No obligation.", "We respond promptly, usually the same business day. No obligation."),
 ("Los mensajes entre semana reciben respuesta el mismo día. Sin compromiso.", "Respondemos con prontitud, normalmente el mismo día hábil. Sin compromiso."),
 ("Same-day response on weekdays.", "Prompt response, usually the same business day."),
 # traffic-site cross reference: same firm, be explicit
 ("The firm’s traffic-ticket and criminal-defense practice continues at trafficticketlawyerelpaso.com.", "The same firm’s traffic-ticket and criminal-defense practice has its own website, trafficticketlawyerelpaso.com."),
 ("La práctica de multas de tráfico y defensa criminal de la firma continúa en trafficticketlawyerelpaso.com.", "La práctica de multas de tráfico y defensa criminal de esta misma firma tiene su propio sitio, trafficticketlawyerelpaso.com."),
]
# 2) brand rename
BRAND = [
 ("| El Paso Law Center", "| Navar Law"),
 ("Contact El Paso Law Center", "Contact the Law Office of Robert Navar"),
 ("Contacto El Paso Law Center", "Contacto Law Office of Robert Navar"),
 ("Common questions about El Paso Law Center", "Common questions about the Law Office of Robert Navar"),
 ("Preguntas comunes sobre El Paso Law Center", "Preguntas comunes sobre Law Office of Robert Navar"),
 ("El Paso Law Center · Law Office of Robert Navar", "Law Office of Robert Navar · El Paso, Texas"),
 ("El Paso Law Center is the general-practice office of the Law Office of Robert Navar", "This website is the general-practice side of the Law Office of Robert Navar"),
 ("El Paso Law Center es la oficina de práctica general de Law Office of Robert Navar", "Este sitio es el lado de práctica general de Law Office of Robert Navar"),
 ("El Paso Law Center (Law Office of Robert Navar)", "The Law Office of Robert Navar"),
 ("El Paso Law Center was built around exactly that work", "This practice was built around exactly that work"),
 ("El Paso Law Center se construyó alrededor de exactamente ese trabajo", "Esta práctica se construyó alrededor de exactamente ese trabajo"),
 ("El Paso Law Center exists for everything else", "This website covers everything else"),
 ("El Paso Law Center existe para todo lo demás", "Este sitio cubre todo lo demás"),
 ("Your El Paso law center — one attorney, every everyday legal need.", "One El Paso attorney, every everyday legal need."),
 ("Su centro legal en El Paso — un abogado, cada necesidad legal cotidiana.", "Un abogado de El Paso, cada necesidad legal cotidiana."),
 ("about El Paso Law Center", "about the Law Office of Robert Navar"),
 ("sobre El Paso Law Center", "sobre Law Office of Robert Navar"),
 ("at El Paso Law Center", "at the Law Office of Robert Navar"),
 ("de El Paso Law Center", "de Law Office of Robert Navar"),
 ("Map to El Paso Law Center", "Map to the Law Office of Robert Navar"),
 ("Mapa a El Paso Law Center", "Mapa a Law Office of Robert Navar"),
 ("El Paso Law Center", "Navar Law"),   # remaining in-sentence uses
]
def apply(s):
    for a,b in R: s = s.replace(a,b)
    for a,b in BRAND: s = s.replace(a,b)
    return s
files = glob.glob('src/content/parts/*/*.json') + ['src/data/pages.ts']
n=0
for f in files:
    s=open(f,encoding='utf8').read(); t=apply(s)
    if t!=s: open(f,'w',encoding='utf8').write(t); n+=1
print('edited',n,'files')
