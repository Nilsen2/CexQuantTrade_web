import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { companyConfig } from "@/lib/company-config"
import { useTranslations } from "next-intl"

export default function PrivacyPolicyPage() {
  const t = useTranslations("Privacy")
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
          {/* 1. Service */}
          <Section
            title={sections.service.title}
            paragraphs={sections.service.paragraphs}
            list={sections.service.list}
          />

          {/* 2. Information */}
          <Section title={sections.information.title}>
            {sections.information.subSections.map((s:any, i:number) => (
              <div key={i} className="space-y-2">
                <p className="font-semibold">{s.label}</p>
                <ul className="list-disc pl-5 space-y-1">
                  {s.list.map((item:any, idx:number) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </Section>

          {/* 其余结构统一 */}
          {[
            "api",
            "ai",
            "usage",
            "security",
            "risk",
            "responsibility",
            "retention",
            "children",
            "updates"
          ].map((key) => {
            const section = sections[key]
            return (
              <Section
                key={key}
                title={section.title}
                paragraphs={section.paragraphs}
                list={section.list}
              />
            )
          })}

          {/* Contact */}
          <Section title={sections.contact.title}>
            <p>
              {sections.contact.emailLabel}:{" "}
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
  paragraphs,
  list
}: {
  title: string
  children?: React.ReactNode
  paragraphs?: string[]
  list?: string[]
}) {
  return (
    <section className="space-y-2">
      <h2 className="text-base font-medium">{title}</h2>
      {children}
      {paragraphs?.map((text, idx) => (
        <p key={idx} className="text-gray-300 leading-relaxed">
          {text}
        </p>
      ))}
      <ul className="list-disc pl-5 text-gray-300 space-y-1">
        {list?.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </section>
  )
}