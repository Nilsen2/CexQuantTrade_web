import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Brain, Hand, Gavel, Zap, Target, ShieldCheck } from "lucide-react";
import { CodeBlock } from "@/components/CodeBlock";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';


export async function generateMetadata() {
  const t = await getTranslations('HowItWorks');
  return {
    title: t('tt'),
    description: t('td'),
  };
}

export default async function HowItWorks() {
  const t = await getTranslations('HowItWorks');
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": t('jsonLdH'),
    "description": t('jsonLdD'),
    "author": {
      "@type": "Organization",
      "name": "AMCC Labs."
    },
    "image": "",
    "datePublished": "2026-01-10"
  };


const codeSnippet = `
for (let step = 0; step < TRAIN_STEPS; step++) {
    const sequences = model.generate({ batchSize: 64 });
    
    const rewards = sequences.map(seq => {
        const factor = vm.execute(seq, cryptoData);
        return backtest.evaluate(factor);
    });

    const loss = computePolicyLoss(sequences, rewards);
    loss.backward();
    optimizer.step();

    if (use_lord) {
        lord_optimizer.step(); (Low-Rank)
    }
}`;

  return (
    <article className="container mx-auto px-4 py-16 min-h-screen text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="space-y-4 mb-10">
        <Badge variant="secondary" className="mb-2">{t('tag')}</Badge>
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          ArcaneGPT：<span className="text-primary text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">{t('h1')}</span>
        </h1>
        <p className="text-xl text-muted-foreground">
          {t('h2')}
        </p>
        <div className="flex items-center space-x-4 pt-4">
          <div className="text-sm">
            <p className="font-medium">AMCC Labs.</p>
            <p className="text-muted-foreground">Jan 10, 2026</p>
          </div>
        </div>
      </header>

      <div className="prose prose-slate dark:prose-invert max-w-none">
        <section className="mb-20">
          <h2 className="text-3xl font-bold flex items-center gap-2 mb-8">
            <Zap className="text-yellow-500" /> {t('h3')}
          </h2>
          <p className="text-lg leading-relaxed">
            {t('h4')}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            <Card className="bg-slate-50 dark:bg-slate-900 border-none">
              <CardHeader>
                <Brain className="w-10 h-10 text-blue-500 mb-2" />
                <CardTitle className="text-muted-foreground">{t('h5')}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {t('h6')}
              </CardContent>
            </Card>
            <Card className="bg-slate-50 dark:bg-slate-900 border-none">
              <CardHeader>
                <Hand className="w-10 h-10 text-green-500 mb-2" />
                <CardTitle className="text-muted-foreground">{t('h7')}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {t('h8')}
              </CardContent>
            </Card>
            <Card className="bg-slate-50 dark:bg-slate-900 border-none">
              <CardHeader>
                <Gavel className="w-10 h-10 text-red-500 mb-2" />
                <CardTitle className="text-muted-foreground">{t('h9')}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {t('h10')}
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-3xl font-bold flex items-center gap-2 mb-6">
            <ShieldCheck className="text-green-500" /> {t('h11')}
          </h2>
          <div className="space-y-4">
            <p className="text-lg font-medium">{t('h12')}</p>
            <p>
              {t('h13')}
            </p>
            <blockquote className="border-l-4 border-primary p-4 italic">
              {t('h14')}
            </blockquote>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-3xl font-bold flex items-center gap-2 mb-6">
            <Target className="text-purple-500" /> {t('h15')}
          </h2>
          <p className="mb-6">
            {t('h16')}
          </p>
          <CodeBlock code={codeSnippet} language="typescript" />
        </section>

        <Separator className="my-16" />

        <section className="text-center space-y-8">
          <h2 className="text-3xl font-bold">{t('h17')}</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('h18')}
          </p>
          <div className="pt-6">
            <Link href="/signup">
                <Button className="bg-purple-600 hover:bg-purple-700">
                {t('start')}
                </Button>
            </Link>
          </div>
        </section>
      </div>
    </article>
  );
}