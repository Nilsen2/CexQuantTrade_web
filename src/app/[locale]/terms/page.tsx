
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { companyConfig } from "@/lib/company-config"
import { useTranslations } from "next-intl"

export default function TermsOfUsePage() {
   const t = useTranslations("Terms")
   // @ts-ignore
  const sections = t.raw("sections")
  return (
    <main className="container mx-auto px-4 py-10 text-gray-200">
      <Card className="bg-zinc-900/50 border-zinc-800 shadow-xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-white">
            {t("title")}
          </CardTitle>
          <p className="text-sm text-gray-400 mt-1">
            {t("lastUpdated")}: Jan 1, 2026
          </p>
        </CardHeader>

        <CardContent className="space-y-8 leading-relaxed">
          <Section title={t("sections.acceptance.title")}>
            <p>{t("sections.acceptance.content")}</p>
          </Section>

          <Section title={t("sections.usage.title")}>
            <p>{t("sections.usage.content")}</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>{t("sections.usage.list.0")}</li>
              <li>{t("sections.usage.list.1")}</li>
              <li>{t("sections.usage.list.2")}</li>
            </ul>
          </Section>

          {[
            "account",
            "subscription",
            "ip",
            "disclaimer",
            "liability",
            "termination",
            "law",
            "changes"
          ].map((key) => 
            {
              const section = sections[key]
              return (
                <Section
                key={key}
                title={section.title}
                content={section.content}
                list={section.list}
                >
                </Section>
              )
            }
           
          )}

          <Section title={t("sections.contact.title")}>
            <p>
              {t("sections.contact.emailLabel")}:{" "}
              <a
                href={`mailto:${companyConfig.email}`}
                className="text-blue-400 hover:underline"
              >
                {companyConfig.email}
              </a>
            </p>
          </Section>
        </CardContent>
      </Card>
    </main>
  )
}

function Section({
 title,
  children,
  content,
  list
}: {
  title: string
  children?: React.ReactNode
  content?: string
  list?: string[]
}) {
  return (
    <section className="space-y-2">
      <h2 className="text-base font-medium">{title}</h2>
      {children}
      <p className="text-gray-300 leading-relaxed">
        {content}
      </p>
      <ul className="list-disc pl-5 text-gray-300 space-y-1">
        {list?.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </section>
  )
}