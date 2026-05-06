"use client"

import { useEffect, useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import {
  AlertTitle,
} from "@/components/ui/alert"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { KeyRound, Eye, EyeOff, CircleCheck, AlertCircleIcon } from "lucide-react"
import { useTranslations } from "next-intl"
import { apiClient } from "@/lib/fetchApi";
import { toast } from "sonner";

interface ApiKeyDTO {
	type:      number
	apiKey:    string
	secretKey: string
	password:  string 
}
export default function ApiTokenPage() {
  const t = useTranslations();
  const [activeTab, setActiveTab] = useState("binance")
  const [show, setShow] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [form, setForm] = useState({
    binance: { apiKey: "", secretKey: "", type: 1 },
    okx: { apiKey: "", secretKey: "", password: "", type: 2 },
  })

  const handleChange = (exchange: "binance" | "okx", field: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [exchange]: { ...prev[exchange], [field]: value },
    }))
  }

  const handleSave = async () => {
    try {
       const result = await apiClient.post('/set/apikey',
        activeTab === 'binance' ? form.binance : form.okx
       )
       if (result.code === 0) {
        toast.success(t('PubDesc.Saved'),{
          duration: 2000
        });
       }
    } catch (error) {
      
    }
  }
  const getKeyInfo = async () => {
    try {
      const result = await apiClient.post<ApiKeyDTO[]>('/get/apikey')
       if (result.code === 0) {
        // 初始化新的 form
        const newForm = { ...form };

        result.data.forEach((item: any) => {
          switch (item.type) {
            case 1: // Binance
              newForm.binance = {
                apiKey: item.apiKey || "",
                secretKey: item.secretKey || "",
                type: item.type,
              };
              break;
            case 2: // OKX
              newForm.okx = {
                apiKey: item.apiKey || "",
                secretKey: item.secretKey || "",
                password: item.password || "",
                type: item.type,
              };
              break;
          }
        });

        setForm(newForm);
       }
    } catch (error) {
      
    }
  }
  useEffect(() => {
    getKeyInfo();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight mb-4 text-white flex items-center">
        <KeyRound className="w-6 h-6 mr-2" />
        {t('User.ApiToken.a1')}
      </h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-2">
        <TabsList className="bg-zinc-900/70 border border-zinc-800 p-1 rounded-xl w-fit h-11">
          <TabsTrigger
            value="binance"
            className="text-zinc-300 cursor-pointer w-35 data-[state=active]:bg-zinc-800 data-[state=active]:text-white"
          >
            Binance
          </TabsTrigger>
          <TabsTrigger
            value="okx"
            className="text-zinc-300 cursor-pointer data-[state=active]:bg-zinc-800 data-[state=active]:text-white"
          >
            OKX
          </TabsTrigger>
        </TabsList>

        {/* Binance 设置 */}
        <TabsContent value="binance">
          <Card className="bg-zinc-900/70 border-zinc-800 shadow-[0_0_8px_rgba(255,255,255,0.05)]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <KeyRound className="w-5 h-5 text-yellow-400" />
                {t('User.ApiToken.a2', {name: 'Binance'})}
              </CardTitle>
              <CardDescription className="text-zinc-400">
              {t('User.ApiToken.a3', {name: 'Binance'})}
              </CardDescription>
              <CardDescription className="text-red-400 flex items-center">
                <AlertCircleIcon />
                <AlertTitle className="ml-2">
                  {t('User.ApiToken.a8')}
                </AlertTitle>
              </CardDescription>
               <CardDescription className="text-green-400 flex items-center">
                <CircleCheck />
                <AlertTitle className="ml-2">
                  {t('User.ApiToken.a9')}
                </AlertTitle>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-zinc-300 mb-2">{t('User.ApiToken.a4')}</Label>
                <Input
                  placeholder="Enter your Binance API Key"
                  value={form.binance.apiKey}
                  onChange={(e) => handleChange("binance", "apiKey", e.target.value)}
                  className="bg-zinc-800 border-zinc-700 text-zinc-100"
                />
              </div>
              <div className="relative">
                <Label className="text-zinc-300 mb-2">{t('User.ApiToken.a5')}</Label>
                <Input
                  placeholder="Enter your Binance Secret Key"
                  type={show ? "text" : "password"}
                  value={form.binance.secretKey}
                  onChange={(e) => handleChange("binance", "secretKey", e.target.value)}
                  className="bg-zinc-800 border-zinc-700 text-zinc-100"
                />
                <div
                  className="text-white absolute right-2 top-2/3 -translate-y-1/2 p-1"
                  onClick={() => setShow((prev) => !prev)}
                >
                  {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-start">
              <Button
                onClick={handleSave}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                {t('User.ApiToken.a7')}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* OKX 设置 */}
        <TabsContent value="okx">
          <Card className="bg-zinc-900/70 border-zinc-800 shadow-[0_0_8px_rgba(255,255,255,0.05)]">
            <CardHeader>
              <CardTitle className="flex items-center text-white gap-2">
                <KeyRound className="w-5 h-5 text-orange-400" />
                {t('User.ApiToken.a2', {name: 'OKX'})}
              </CardTitle>
              <CardDescription className="text-zinc-400">
              {t('User.ApiToken.a3', {name: 'OKX'})}
              </CardDescription>
             <CardDescription className="text-red-400 flex items-center">
                <AlertCircleIcon />
                <AlertTitle className="ml-2">
                  {t('User.ApiToken.a8')}
                </AlertTitle>
              </CardDescription>
               <CardDescription className="text-green-400 flex items-center">
                <CircleCheck />
                <AlertTitle className="ml-2">
                  {t('User.ApiToken.a9')}
                </AlertTitle>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-zinc-300 mb-2">{t('User.ApiToken.a4')}</Label>
                <Input
                  placeholder="Enter your OKX API Key"
                  value={form.okx.apiKey}
                  onChange={(e) => handleChange("okx", "apiKey", e.target.value)}
                  className="bg-zinc-800 border-zinc-700 text-zinc-100"
                />
              </div>
              <div className="relative">
                <Label className="text-zinc-300 mb-2">{t('User.ApiToken.a5')}</Label>
                <Input
                  placeholder="Enter your OKX Secret Key"
                  type={show ? "text" : "password"}
                  value={form.okx.secretKey}
                  onChange={(e) => handleChange("okx", "secretKey", e.target.value)}
                  className="bg-zinc-800 border-zinc-700 text-zinc-100"
                />
                <div
                  className="text-white absolute right-2 top-2/3 -translate-y-1/2 p-1"
                  onClick={() => setShow((prev) => !prev)}
                >
                  {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </div>
              </div>
              <div className="relative">
                <Label className="text-zinc-300 mb-2">{t('User.ApiToken.a6')}</Label>
                <Input
                  placeholder="Enter your Password"
                  type={showPwd ? "text" : "password"}
                  value={form.okx.password}
                  onChange={(e) => handleChange("okx", "password", e.target.value)}
                  className="bg-zinc-800 border-zinc-700 text-zinc-100"
                />
                <div
                  className="text-white absolute right-2 top-2/3 -translate-y-1/2 p-1"
                  onClick={() => setShowPwd((prev) => !prev)}
                >
                  {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-start">
              <Button
                onClick={handleSave}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                {t('User.ApiToken.a7')}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
