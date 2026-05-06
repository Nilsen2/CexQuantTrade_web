"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { companyConfig } from "@/lib/company-config"
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  CheckCircle,
  Shield,
  DollarSign,
  Target,
  BarChart3,
  Star,
  AlertCircle,
  Loader2
} from "lucide-react";
import { Link, useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { apiClient } from "@/lib/fetchApi";
import { trackEvent, EVENT_TOKEN } from "@/lib/utils";

export default function Signup() {
  const t = useTranslations();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const isReadyToSubmit = useMemo(() => {
    return (
      formData.email.trim() !== "" &&
      formData.password.trim() !== "" &&
      formData.confirmPassword.trim() !== ""
    )
  }, [formData])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError(t("sign.up.t1"));
      setLoading(false);
      return;
    }
    if (formData.password.length < 6) {
      setError(t("sign.up.t2"));
      setLoading(false);
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError(t("sign.up.t3"));
      setLoading(false);
      return;
    }
    // Validate terms agreement
    if (!formData.agreeToTerms) {
      setError(t('ErrMsg.sign1'));
      setLoading(false);
      return;
    }

    try {
      const result = await apiClient.post('/register', {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword
      });
      if (result.code === 0) {
        setSuccess(true);
        trackEvent(EVENT_TOKEN.CompleteRegistration, { method: 'Email' });
        setTimeout(() => {
          router.push("/signin");
        },1500);
      } else {
        setError(result.msg || t('ErrMsg.sign2'));
      }
    } catch (err) {
      setError(t('ErrMsg.sign3'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center px-4 py-1 md:py-10 md:items-center">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 blur-3xl"></div>

      <div className="w-full max-w-6xl relative">
        {/* Header */}
        <div className="my-4 md:mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 text-white hover:text-blue-400 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>{t('PubDesc.back2home')}</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Branding & Benefits */}
          <div className="hidden md:block space-y-8">
            <div>
              <Link href='/' className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-purple-400 rounded-lg flex items-center justify-center text-white font-bold">
                  Q
                </div>
                <span className="text-2xl font-bold text-white">{companyConfig.name}</span>
              </Link>
              <Badge className="mb-4 bg-green-500/10 text-green-400 border-green-500/20">
                <Star className="w-4 h-4 mr-1" />
                {t('sign.start')}
              </Badge>

              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {t('sign.StartTrading')}
              </h1>
              <p className="text-xl text-zinc-300 mb-8">
              {t.rich('sign.Join', {
                name: companyConfig.name,
                })}
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <DollarSign className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">{t('Home.feature.title1')}</h3>
                  <p className="text-zinc-300">{t('Home.feature.desc1')}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <BarChart3 className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">{t('Home.feature.title2')}</h3>
                  <p className="text-zinc-300">{t('Home.feature.desc2')}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Target className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">{t('Home.feature.title3')}</h3>
                  <p className="text-zinc-300">{t('Home.feature.desc3')}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-amber-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">{t('Home.feature.title4')}</h3>
                  <p className="text-zinc-300">{t('Home.feature.desc4')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Signup Form */}
          <div className="w-full max-w-md mx-auto">
            <Card className="border-zinc-800/50">
              <CardHeader className="text-center">
                <CardTitle className="text-white text-2xl">{t('sign.Create Your Account')}</CardTitle>
                <CardDescription className="text-zinc-300">
                {t('sign.Starttoday')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-zinc-300">{t('PubDesc.FirstName')}</Label>
                      <div className="relative">
                        <User className="w-4 h-4 absolute left-3 top-3.5 text-zinc-400" />
                        <Input
                          name="firstName"
                          type="text"
                          placeholder={t('PubDesc.FirstName')}
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="pl-10 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-400"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-zinc-300">{t('PubDesc.LastName')}</Label>
                      <Input
                        name="lastName"
                        type="text"
                        placeholder={t('PubDesc.LastName')}
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-400"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-zinc-300">{t('PubDesc.EmailAddress')}</Label>
                    <div className="relative">
                      <Mail className="w-4 h-4 absolute left-3 top-3.5 text-zinc-400" />
                      <Input
                        name="email"
                        type="text"
                        placeholder={t('PubDesc.EmailAddress')}
                        value={formData.email}
                        onChange={handleInputChange}
                        className="pl-10 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-400"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-zinc-300">{t('PubDesc.Password')}</Label>
                    <div className="relative">
                      <Lock className="w-4 h-4 absolute left-3 top-3.5 text-zinc-400" />
                      <Input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder={t('PubDesc.Password')}
                        value={formData.password}
                        onChange={handleInputChange}
                        className="pl-10 pr-10 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-400"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3.5 text-zinc-400 hover:text-white transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-zinc-300">{t('PubDesc.ConfirmPassword')}</Label>
                    <div className="relative">
                      <Lock className="w-4 h-4 absolute left-3 top-3.5 text-zinc-400" />
                      <Input
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder={t('PubDesc.ConfirmPassword')}
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="pl-10 pr-10 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-400"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-3.5 text-zinc-400 hover:text-white transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <input
                        name="agreeToTerms"
                        type="checkbox"
                        checked={formData.agreeToTerms}
                        onChange={handleInputChange}
                        className="rounded border-zinc-700 bg-zinc-800 text-blue-600 focus:ring-blue-500 mt-0.5"
                        required
                      />
                      <Label htmlFor="terms" className="text-sm text-zinc-300 cursor-pointer leading-relaxed whitespace-nowrap">
                      {t('sign.Iagree')}{" "}
                        <Link href="/terms" className="text-blue-400 hover:text-blue-300 transition-colors">
                        {t('sign.TermsofService')}
                        </Link>{" "}
                        {t('sign.and')}{" "}
                        <Link href="/privacy" className="text-blue-400 hover:text-blue-300 transition-colors">
                        {t('sign.PrivacyPolicy')}
                        </Link>
                      </Label>
                    </div>
                  </div>

                  {error && (
                    <Alert className="border-red-500/50 bg-red-500/10">
                      <AlertCircle className="h-4 w-4 text-red-400!" />
                      <AlertDescription className="text-red-300">
                        {error}
                      </AlertDescription>
                    </Alert>
                  )}

                  {success && (
                    <Alert className="border-green-500/50 bg-green-500/10">
                      <CheckCircle className="h-4 w-4 text-green-400!" />
                      <AlertDescription className="text-green-300">
                      {t('sign.AccountCsuccessfully')}
                      </AlertDescription>
                    </Alert>
                  )}

                  <Button
                    type="submit"
                    className={`w-full ${
                      isReadyToSubmit
                        ? "bg-purple-600 hover:bg-purple-700"
                        : "bg-neutral-700 text-gray-400 cursor-not-allowed"
                    }`}
                    size="lg"
                    disabled={loading || success}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        {t('sign.CreatingAccount')}
                      </>
                    ) : success ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        {t('sign.AccountCreated')}
                      </>
                    ) : (
                      t('sign.CreateAccount&StartTrading')
                    )}
                  </Button>

                  {/* <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-zinc-700"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-zinc-900 text-zinc-400">{t('sign.Or sign up with')}</span>
                    </div>
                  </div> */}

                  {/* <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" type="button" className="border-zinc-700 hover:bg-zinc-800">
                      <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      Google
                    </Button>
                    <Button variant="outline" type="button" className="border-zinc-700 hover:bg-zinc-800">
                      <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      Facebook
                    </Button>
                  </div> */}
                </form>
              </CardContent>
            </Card>

            <p className="text-center text-zinc-400 mt-6">
            {t('sign.AlreadyHaveAccount')}{" "}
              <Link href="/signin" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">
              {t('sign.SignHere')}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
