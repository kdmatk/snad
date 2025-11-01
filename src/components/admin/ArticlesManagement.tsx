import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, Eye, Edit, Trash2, Calendar, User, BookOpen, Star } from "lucide-react";
const ArticlesManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const articles = [{
    id: 1,
    title: "دليل شامل لقانون الشركات السعودي الجديد",
    category: "قانون تجاري",
    author: "د. أحمد العلي",
    status: "published",
    views: 1250,
    featured: true,
    publishDate: "2024-01-15",
    tags: ["شركات", "قانون سعودي", "تجاري"]
  }, {
    id: 2,
    title: "حقوق المرأة في قانون الأحوال الشخصية",
    category: "قانون أسرة",
    author: "د. فاطمة الزهراني",
    status: "draft",
    views: 0,
    featured: false,
    publishDate: null,
    tags: ["أسرة", "حقوق المرأة", "أحوال شخصية"]
  }, {
    id: 3,
    title: "التحكيم التجاري في المملكة العربية السعودية",
    category: "تحكيم",
    author: "د. محمد السعدي",
    status: "published",
    views: 890,
    featured: false,
    publishDate: "2024-01-10",
    tags: ["تحكيم", "تجاري", "نزاعات"]
  }];
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      published: {
        label: "منشور",
        variant: "default" as const,
        color: "bg-green-100 text-green-800"
      },
      draft: {
        label: "مسودة",
        variant: "secondary" as const,
        color: "bg-gray-100 text-gray-800"
      },
      review: {
        label: "قيد المراجعة",
        variant: "outline" as const,
        color: "bg-yellow-100 text-yellow-800"
      }
    };
    const config = statusConfig[status as keyof typeof statusConfig];
    return <Badge className={config.color}>{config.label}</Badge>;
  };
  return <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">إدارة المكتبة القانونية</h2>
          <p className="text-muted-foreground">إدارة المقالات والمحتوى القانوني</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 ml-2" />
          إضافة مقال جديد
        </Button>
      </div>

      {/* أدوات البحث */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="البحث في المقالات..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pr-10" />
          </div>
        </CardContent>
      </Card>

      {/* إحصائيات المقالات */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-blue-600">{articles.length}</div>
            <div className="text-sm text-muted-foreground">إجمالي المقالات</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-green-600">
              {articles.filter(a => a.status === 'published').length}
            </div>
            <div className="text-sm text-muted-foreground">منشورة</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {articles.filter(a => a.featured).length}
            </div>
            <div className="text-sm text-muted-foreground">مميزة</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {articles.reduce((sum, a) => sum + a.views, 0)}
            </div>
            <div className="text-sm text-muted-foreground">إجمالي المشاهدات</div>
          </CardContent>
        </Card>
      </div>

      {/* جدول المقالات */}
      <Card>
        <CardHeader>
          <CardTitle>قائمة المقالات</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>عنوان المقال</TableHead>
                <TableHead>الفئة</TableHead>
                <TableHead>الكاتب</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>المشاهدات</TableHead>
                <TableHead>تاريخ النشر</TableHead>
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {articles.map(article => <TableRow key={article.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium flex items-center gap-2">
                        {article.title}
                        {article.featured && <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />}
                      </div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {article.tags.slice(0, 3).map((tag, index) => <Badge key={index} variant="outline" className="text-xs bg-blue-800">
                            {tag}
                          </Badge>)}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{article.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>{article.author}</span>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(article.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4 text-muted-foreground" />
                      <span>{article.views}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {article.publishDate ? <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          {new Date(article.publishDate).toLocaleDateString('ar-SA')}
                        </span>
                      </div> : <span className="text-muted-foreground">غير منشور</span>}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>)}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>;
};
export default ArticlesManagement;