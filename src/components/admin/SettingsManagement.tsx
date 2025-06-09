
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Save, 
  Upload,
  Settings,
  Palette,
  DollarSign,
  Bell,
  Shield,
  Mail
} from "lucide-react";

const SettingsManagement = () => {
  const [settings, setSettings] = useState({
    siteName: "سند للخدمات القانونية",
    siteDescription: "منصة رائدة لربط المحامين بالعملاء",
    primaryColor: "#1e3a8a",
    secondaryColor: "#d4af37",
    commissionRate: 15,
    minConsultationPrice: 50,
    maxConsultationDuration: 120,
    enableNotifications: true,
    enableEmailAlerts: true,
    enableSMSAlerts: false
  });

  const handleSave = () => {
    console.log('Saving settings:', settings);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">إعدادات النظام</h2>
          <p className="text-muted-foreground">إدارة الإعدادات العامة للمنصة</p>
        </div>
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 ml-2" />
          حفظ التغييرات
        </Button>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general">عام</TabsTrigger>
          <TabsTrigger value="appearance">المظهر</TabsTrigger>
          <TabsTrigger value="financial">مالي</TabsTrigger>
          <TabsTrigger value="notifications">الإشعارات</TabsTrigger>
          <TabsTrigger value="security">الأمان</TabsTrigger>
          <TabsTrigger value="legal">قانوني</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                الإعدادات العامة
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="siteName">اسم الموقع</Label>
                  <Input
                    id="siteName"
                    value={settings.siteName}
                    onChange={(e) => setSettings({...settings, siteName: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="siteDescription">وصف الموقع</Label>
                  <Input
                    id="siteDescription"
                    value={settings.siteDescription}
                    onChange={(e) => setSettings({...settings, siteDescription: e.target.value})}
                  />
                </div>
              </div>
              
              <div>
                <Label>شعار الموقع</Label>
                <div className="flex items-center gap-4 mt-2">
                  <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary">سند</span>
                  </div>
                  <Button variant="outline">
                    <Upload className="h-4 w-4 ml-2" />
                    رفع شعار جديد
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                إعدادات المظهر
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="primaryColor">اللون الأساسي</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Input
                      id="primaryColor"
                      type="color"
                      value={settings.primaryColor}
                      onChange={(e) => setSettings({...settings, primaryColor: e.target.value})}
                      className="w-16 h-10"
                    />
                    <Input
                      value={settings.primaryColor}
                      onChange={(e) => setSettings({...settings, primaryColor: e.target.value})}
                      className="flex-1"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="secondaryColor">اللون الثانوي</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Input
                      id="secondaryColor"
                      type="color"
                      value={settings.secondaryColor}
                      onChange={(e) => setSettings({...settings, secondaryColor: e.target.value})}
                      className="w-16 h-10"
                    />
                    <Input
                      value={settings.secondaryColor}
                      onChange={(e) => setSettings({...settings, secondaryColor: e.target.value})}
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">معاينة الألوان</h4>
                <div className="flex gap-4">
                  <div 
                    className="w-20 h-20 rounded-lg flex items-center justify-center text-white font-bold"
                    style={{ backgroundColor: settings.primaryColor }}
                  >
                    أساسي
                  </div>
                  <div 
                    className="w-20 h-20 rounded-lg flex items-center justify-center text-white font-bold"
                    style={{ backgroundColor: settings.secondaryColor }}
                  >
                    ثانوي
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financial" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                الإعدادات المالية
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="commissionRate">نسبة العمولة (%)</Label>
                  <Input
                    id="commissionRate"
                    type="number"
                    value={settings.commissionRate}
                    onChange={(e) => setSettings({...settings, commissionRate: Number(e.target.value)})}
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    النسبة المئوية من كل معاملة
                  </p>
                </div>
                <div>
                  <Label htmlFor="minPrice">أقل سعر للاستشارة (ريال)</Label>
                  <Input
                    id="minPrice"
                    type="number"
                    value={settings.minConsultationPrice}
                    onChange={(e) => setSettings({...settings, minConsultationPrice: Number(e.target.value)})}
                  />
                </div>
                <div>
                  <Label htmlFor="maxDuration">أقصى مدة للاستشارة (دقيقة)</Label>
                  <Input
                    id="maxDuration"
                    type="number"
                    value={settings.maxConsultationDuration}
                    onChange={(e) => setSettings({...settings, maxConsultationDuration: Number(e.target.value)})}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                إعدادات الإشعارات
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label>تفعيل الإشعارات</Label>
                  <p className="text-sm text-muted-foreground">
                    تفعيل نظام الإشعارات العام
                  </p>
                </div>
                <Switch
                  checked={settings.enableNotifications}
                  onCheckedChange={(checked) => setSettings({...settings, enableNotifications: checked})}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label>إشعارات البريد الإلكتروني</Label>
                  <p className="text-sm text-muted-foreground">
                    إرسال إشعارات عبر البريد الإلكتروني
                  </p>
                </div>
                <Switch
                  checked={settings.enableEmailAlerts}
                  onCheckedChange={(checked) => setSettings({...settings, enableEmailAlerts: checked})}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label>إشعارات الرسائل النصية</Label>
                  <p className="text-sm text-muted-foreground">
                    إرسال إشعارات عبر SMS
                  </p>
                </div>
                <Switch
                  checked={settings.enableSMSAlerts}
                  onCheckedChange={(checked) => setSettings({...settings, enableSMSAlerts: checked})}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                إعدادات الأمان
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h4 className="font-medium text-yellow-800 mb-2">معلومات مهمة</h4>
                <p className="text-sm text-yellow-700">
                  إعدادات الأمان تتطلب صلاحيات خاصة وقد تؤثر على أداء النظام.
                </p>
              </div>
              
              <Button variant="outline" className="w-full">
                <Shield className="h-4 w-4 ml-2" />
                إعدادات الأمان المتقدمة
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="legal" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>الصفحات القانونية</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="terms">شروط الاستخدام</Label>
                <Textarea
                  id="terms"
                  rows={6}
                  placeholder="اكتب شروط الاستخدام هنا..."
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="privacy">سياسة الخصوصية</Label>
                <Textarea
                  id="privacy"
                  rows={6}
                  placeholder="اكتب سياسة الخصوصية هنا..."
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsManagement;
