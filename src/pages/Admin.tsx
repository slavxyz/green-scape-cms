import { useState } from "react";
import { Link } from "react-router-dom";
import { useSiteData } from "@/contexts/SiteDataContext";
import { useLanguage, getAllTranslationKeys, defaultEnglish } from "@/contexts/LanguageContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Plus, Trash2, Save, Leaf, Globe } from "lucide-react";
import logoDefault from "@/assets/logo-default.jpeg";
import logoEaster from "@/assets/logo-easter.jpeg";
import { toast } from "sonner";
import type { Service, Project, BlogPost } from "@/data/siteData";

export default function Admin() {
  const { data, updateServices, updateProjects, updateBlogPosts, updateAbout, updateCompanyInfo, updateActiveLogo } = useSiteData();
  const { languages, addLanguage, removeLanguage, translations, setTranslations } = useLanguage();

  const [services, setServices] = useState<Service[]>(data.services);
  const [projects, setProjects] = useState<Project[]>(data.projects);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(data.blogPosts);
  const [about, setAbout] = useState(data.about);
  const [companyName, setCompanyName] = useState(data.companyName);
  const [phone, setPhone] = useState(data.phone);

  // Language management state
  const [newLangCode, setNewLangCode] = useState("");
  const [newLangName, setNewLangName] = useState("");
  const [newLangFlag, setNewLangFlag] = useState("");
  const [editingLang, setEditingLang] = useState<string>(languages.length > 1 ? languages[1].code : "");
  const [editTranslations, setEditTranslations] = useState<Record<string, string>>({});

  const allKeys = getAllTranslationKeys();

  // Dynamic content keys for current data
  const dynamicKeys: { key: string; label: string; englishValue: string }[] = [];
  data.services.forEach((s) => {
    dynamicKeys.push({ key: `service.${s.id}.title`, label: `Service: ${s.title} — Title`, englishValue: s.title });
    dynamicKeys.push({ key: `service.${s.id}.description`, label: `Service: ${s.title} — Description`, englishValue: s.description });
  });
  data.projects.forEach((p) => {
    dynamicKeys.push({ key: `project.${p.id}.title`, label: `Project: ${p.title} — Title`, englishValue: p.title });
    dynamicKeys.push({ key: `project.${p.id}.description`, label: `Project: ${p.title} — Description`, englishValue: p.description });
  });
  data.blogPosts.forEach((b) => {
    dynamicKeys.push({ key: `blog.${b.id}.title`, label: `Blog: ${b.title} — Title`, englishValue: b.title });
    dynamicKeys.push({ key: `blog.${b.id}.excerpt`, label: `Blog: ${b.title} — Excerpt`, englishValue: b.excerpt });
    dynamicKeys.push({ key: `blog.${b.id}.content`, label: `Blog: ${b.title} — Content`, englishValue: b.content });
  });

  const loadLangForEditing = (code: string) => {
    setEditingLang(code);
    setEditTranslations({ ...(translations[code] || {}) });
  };

  const handleAddLanguage = () => {
    if (!newLangCode.trim() || !newLangName.trim()) {
      toast.error("Language code and name are required");
      return;
    }
    if (languages.some((l) => l.code === newLangCode.trim().toLowerCase())) {
      toast.error("Language already exists");
      return;
    }
    const code = newLangCode.trim().toLowerCase();
    addLanguage({ code, name: newLangName.trim(), flag: newLangFlag.trim() || "🌐" });
    setNewLangCode("");
    setNewLangName("");
    setNewLangFlag("");
    setEditingLang(code);
    setEditTranslations({});
    toast.success(`Added ${newLangName.trim()}`);
  };

  const handleSaveTranslations = () => {
    if (!editingLang) return;
    setTranslations(editingLang, editTranslations);
    toast.success(`Translations for ${languages.find((l) => l.code === editingLang)?.name} saved!`);
  };

  const handleRemoveLanguage = (code: string) => {
    removeLanguage(code);
    if (editingLang === code) {
      setEditingLang("");
      setEditTranslations({});
    }
    toast.success("Language removed");
  };

  const saveServices = () => { updateServices(services); toast.success("Services saved!"); };
  const saveProjects = () => { updateProjects(projects); toast.success("Projects saved!"); };
  const saveBlog = () => { updateBlogPosts(blogPosts); toast.success("Blog posts saved!"); };
  const saveAbout = () => { updateAbout(about); updateCompanyInfo(companyName, phone); toast.success("About info saved!"); };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="border-b bg-background">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center gap-3">
            <Leaf className="h-6 w-6 text-primary" />
            <span className="font-display text-lg font-bold text-primary">Admin Panel</span>
          </div>
          <Button asChild variant="ghost" size="sm" className="gap-1">
            <Link to="/"><ArrowLeft className="h-4 w-4" /> Back to Site</Link>
          </Button>
        </div>
      </header>

      <div className="container py-8">
        <Tabs defaultValue="services" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="blog">Blog</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="languages" className="gap-1">
              <Globe className="h-4 w-4" /> Languages
            </TabsTrigger>
          </TabsList>

          {/* SERVICES TAB */}
          <TabsContent value="services" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-bold">Manage Services</h2>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => setServices([...services, { id: Date.now().toString(), title: "", description: "", icon: "sprout" }])}>
                  <Plus className="mr-1 h-4 w-4" /> Add
                </Button>
                <Button size="sm" onClick={saveServices}><Save className="mr-1 h-4 w-4" /> Save</Button>
              </div>
            </div>
            {services.map((s, i) => (
              <Card key={s.id}>
                <CardContent className="grid gap-3 p-4 sm:grid-cols-2">
                  <div>
                    <Label>Title</Label>
                    <Input value={s.title} onChange={(e) => { const next = [...services]; next[i] = { ...s, title: e.target.value }; setServices(next); }} />
                  </div>
                  <div>
                    <Label>Icon (scissors, calendar, flower, sprout, droplets)</Label>
                    <Input value={s.icon} onChange={(e) => { const next = [...services]; next[i] = { ...s, icon: e.target.value }; setServices(next); }} />
                  </div>
                  <div className="sm:col-span-2">
                    <Label>Description</Label>
                    <Textarea value={s.description} onChange={(e) => { const next = [...services]; next[i] = { ...s, description: e.target.value }; setServices(next); }} />
                  </div>
                  <Button variant="destructive" size="sm" className="w-fit" onClick={() => setServices(services.filter((_, j) => j !== i))}>
                    <Trash2 className="mr-1 h-4 w-4" /> Remove
                  </Button>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* PROJECTS TAB */}
          <TabsContent value="projects" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-bold">Manage Projects</h2>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => setProjects([...projects, { id: Date.now().toString(), title: "", description: "", image: "", date: new Date().toISOString().split("T")[0] }])}>
                  <Plus className="mr-1 h-4 w-4" /> Add
                </Button>
                <Button size="sm" onClick={saveProjects}><Save className="mr-1 h-4 w-4" /> Save</Button>
              </div>
            </div>
            {projects.map((p, i) => (
              <Card key={p.id}>
                <CardContent className="grid gap-3 p-4 sm:grid-cols-2">
                  <div>
                    <Label>Title</Label>
                    <Input value={p.title} onChange={(e) => { const next = [...projects]; next[i] = { ...p, title: e.target.value }; setProjects(next); }} />
                  </div>
                  <div>
                    <Label>Date</Label>
                    <Input type="date" value={p.date} onChange={(e) => { const next = [...projects]; next[i] = { ...p, date: e.target.value }; setProjects(next); }} />
                  </div>
                  <div className="sm:col-span-2">
                    <Label>Image URL</Label>
                    <Input value={p.image} onChange={(e) => { const next = [...projects]; next[i] = { ...p, image: e.target.value }; setProjects(next); }} />
                  </div>
                  <div className="sm:col-span-2">
                    <Label>Description</Label>
                    <Textarea value={p.description} onChange={(e) => { const next = [...projects]; next[i] = { ...p, description: e.target.value }; setProjects(next); }} />
                  </div>
                  <Button variant="destructive" size="sm" className="w-fit" onClick={() => setProjects(projects.filter((_, j) => j !== i))}>
                    <Trash2 className="mr-1 h-4 w-4" /> Remove
                  </Button>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* BLOG TAB */}
          <TabsContent value="blog" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-bold">Manage Blog Posts</h2>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => setBlogPosts([...blogPosts, { id: Date.now().toString(), title: "", excerpt: "", content: "", image: "", date: new Date().toISOString().split("T")[0], author: "GreenScape Team" }])}>
                  <Plus className="mr-1 h-4 w-4" /> Add
                </Button>
                <Button size="sm" onClick={saveBlog}><Save className="mr-1 h-4 w-4" /> Save</Button>
              </div>
            </div>
            {blogPosts.map((post, i) => (
              <Card key={post.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{post.title || "New Post"}</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-3 p-4 pt-0 sm:grid-cols-2">
                  <div>
                    <Label>Title</Label>
                    <Input value={post.title} onChange={(e) => { const next = [...blogPosts]; next[i] = { ...post, title: e.target.value }; setBlogPosts(next); }} />
                  </div>
                  <div>
                    <Label>Date</Label>
                    <Input type="date" value={post.date} onChange={(e) => { const next = [...blogPosts]; next[i] = { ...post, date: e.target.value }; setBlogPosts(next); }} />
                  </div>
                  <div>
                    <Label>Author</Label>
                    <Input value={post.author} onChange={(e) => { const next = [...blogPosts]; next[i] = { ...post, author: e.target.value }; setBlogPosts(next); }} />
                  </div>
                  <div>
                    <Label>Image URL</Label>
                    <Input value={post.image} onChange={(e) => { const next = [...blogPosts]; next[i] = { ...post, image: e.target.value }; setBlogPosts(next); }} />
                  </div>
                  <div className="sm:col-span-2">
                    <Label>Excerpt</Label>
                    <Textarea rows={2} value={post.excerpt} onChange={(e) => { const next = [...blogPosts]; next[i] = { ...post, excerpt: e.target.value }; setBlogPosts(next); }} />
                  </div>
                  <div className="sm:col-span-2">
                    <Label>Content (Markdown-style)</Label>
                    <Textarea rows={6} value={post.content} onChange={(e) => { const next = [...blogPosts]; next[i] = { ...post, content: e.target.value }; setBlogPosts(next); }} />
                  </div>
                  <Button variant="destructive" size="sm" className="w-fit" onClick={() => setBlogPosts(blogPosts.filter((_, j) => j !== i))}>
                    <Trash2 className="mr-1 h-4 w-4" /> Remove
                  </Button>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* ABOUT TAB */}
          <TabsContent value="about" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-bold">Manage About Info</h2>
              <Button size="sm" onClick={saveAbout}><Save className="mr-1 h-4 w-4" /> Save</Button>
            </div>
            <Card>
              <CardContent className="grid gap-4 p-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <Label>Company Name</Label>
                    <Input value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
                  </div>
                  <div>
                    <Label>Phone</Label>
                    <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
                  </div>
                </div>
                <div>
                  <Label>Site Logo</Label>
                  <div className="mt-2 flex gap-4">
                    {[
                      { key: "default" as const, src: logoDefault, label: "Default" },
                      { key: "easter" as const, src: logoEaster, label: "Easter" },
                    ].map((logo) => (
                      <button
                        key={logo.key}
                        type="button"
                        onClick={() => updateActiveLogo(logo.key)}
                        className={`flex flex-col items-center gap-2 rounded-lg border-2 p-3 transition-colors ${
                          data.activeLogo === logo.key ? "border-primary bg-primary/10" : "border-muted hover:border-primary/50"
                        }`}
                      >
                        <img src={logo.src} alt={logo.label} className="h-16 w-16 rounded-full object-cover" />
                        <span className="text-sm font-medium">{logo.label}</span>
                      </button>
                    ))}
                  </div>
                  <Textarea rows={4} value={about.story} onChange={(e) => setAbout({ ...about, story: e.target.value })} />
                </div>
                <div>
                  <Label>Mission</Label>
                  <Textarea rows={3} value={about.mission} onChange={(e) => setAbout({ ...about, mission: e.target.value })} />
                </div>
                <div>
                  <Label>Experience</Label>
                  <Textarea rows={3} value={about.experience} onChange={(e) => setAbout({ ...about, experience: e.target.value })} />
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <Label>Team Members</Label>
                    <Button size="sm" variant="outline" onClick={() => setAbout({ ...about, teamMembers: [...about.teamMembers, { name: "", role: "", image: "" }] })}>
                      <Plus className="mr-1 h-4 w-4" /> Add Member
                    </Button>
                  </div>
                  {about.teamMembers.map((member, i) => (
                    <div key={i} className="mt-3 grid gap-2 rounded-md border p-3 sm:grid-cols-3">
                      <div>
                        <Label>Name</Label>
                        <Input value={member.name} onChange={(e) => { const next = [...about.teamMembers]; next[i] = { ...member, name: e.target.value }; setAbout({ ...about, teamMembers: next }); }} />
                      </div>
                      <div>
                        <Label>Role</Label>
                        <Input value={member.role} onChange={(e) => { const next = [...about.teamMembers]; next[i] = { ...member, role: e.target.value }; setAbout({ ...about, teamMembers: next }); }} />
                      </div>
                      <div className="flex items-end gap-2">
                        <div className="flex-1">
                          <Label>Image URL</Label>
                          <Input value={member.image} onChange={(e) => { const next = [...about.teamMembers]; next[i] = { ...member, image: e.target.value }; setAbout({ ...about, teamMembers: next }); }} />
                        </div>
                        <Button variant="destructive" size="icon" onClick={() => setAbout({ ...about, teamMembers: about.teamMembers.filter((_, j) => j !== i) })}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* LANGUAGES TAB */}
          <TabsContent value="languages" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-bold">Manage Languages</h2>
            </div>

            {/* Add new language */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Add New Language</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3 sm:grid-cols-4">
                  <div>
                    <Label>Code (e.g. "fr", "es", "sr")</Label>
                    <Input value={newLangCode} onChange={(e) => setNewLangCode(e.target.value)} placeholder="fr" />
                  </div>
                  <div>
                    <Label>Name</Label>
                    <Input value={newLangName} onChange={(e) => setNewLangName(e.target.value)} placeholder="French" />
                  </div>
                  <div>
                    <Label>Flag emoji</Label>
                    <Input value={newLangFlag} onChange={(e) => setNewLangFlag(e.target.value)} placeholder="🇫🇷" />
                  </div>
                  <div className="flex items-end">
                    <Button onClick={handleAddLanguage} className="w-full">
                      <Plus className="mr-1 h-4 w-4" /> Add Language
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Existing languages */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Active Languages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {languages.map((lang) => (
                    <div key={lang.code} className="flex items-center gap-2 rounded-md border bg-background px-3 py-2">
                      <span>{lang.flag}</span>
                      <span className="text-sm font-medium">{lang.name}</span>
                      <span className="text-xs text-muted-foreground">({lang.code})</span>
                      {lang.code !== "en" && (
                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleRemoveLanguage(lang.code)}>
                          <Trash2 className="h-3 w-3 text-destructive" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Translation editor */}
            {languages.length > 1 && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">Edit Translations</CardTitle>
                    <div className="flex items-center gap-2">
                      <Select value={editingLang} onValueChange={loadLangForEditing}>
                        <SelectTrigger className="w-[200px]">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          {languages.filter((l) => l.code !== "en").map((lang) => (
                            <SelectItem key={lang.code} value={lang.code}>
                              {lang.flag} {lang.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button size="sm" onClick={handleSaveTranslations} disabled={!editingLang}>
                        <Save className="mr-1 h-4 w-4" /> Save
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                {editingLang && (
                  <CardContent className="space-y-6">
                    {/* UI Translations */}
                    <div>
                      <h3 className="mb-3 font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">UI Labels</h3>
                      <div className="space-y-3">
                        {allKeys.map((key) => (
                          <div key={key} className="grid gap-2 sm:grid-cols-2">
                            <div>
                              <Label className="text-xs text-muted-foreground">{key}</Label>
                              <p className="text-sm text-foreground/70">{defaultEnglish[key]}</p>
                            </div>
                            <div>
                              <Label className="text-xs text-muted-foreground">Translation</Label>
                              {defaultEnglish[key].length > 80 ? (
                                <Textarea
                                  rows={2}
                                  value={editTranslations[key] || ""}
                                  onChange={(e) => setEditTranslations({ ...editTranslations, [key]: e.target.value })}
                                  placeholder={defaultEnglish[key]}
                                />
                              ) : (
                                <Input
                                  value={editTranslations[key] || ""}
                                  onChange={(e) => setEditTranslations({ ...editTranslations, [key]: e.target.value })}
                                  placeholder={defaultEnglish[key]}
                                />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Dynamic Content Translations */}
                    {dynamicKeys.length > 0 && (
                      <div>
                        <h3 className="mb-3 font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">Content Translations</h3>
                        <div className="space-y-3">
                          {dynamicKeys.map(({ key, label, englishValue }) => (
                            <div key={key} className="grid gap-2 sm:grid-cols-2">
                              <div>
                                <Label className="text-xs text-muted-foreground">{label}</Label>
                                <p className="max-h-20 overflow-y-auto text-sm text-foreground/70">{englishValue.substring(0, 200)}{englishValue.length > 200 ? "…" : ""}</p>
                              </div>
                              <div>
                                <Label className="text-xs text-muted-foreground">Translation</Label>
                                {englishValue.length > 80 ? (
                                  <Textarea
                                    rows={3}
                                    value={editTranslations[key] || ""}
                                    onChange={(e) => setEditTranslations({ ...editTranslations, [key]: e.target.value })}
                                    placeholder={englishValue.substring(0, 100) + "..."}
                                  />
                                ) : (
                                  <Input
                                    value={editTranslations[key] || ""}
                                    onChange={(e) => setEditTranslations({ ...editTranslations, [key]: e.target.value })}
                                    placeholder={englishValue}
                                  />
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                )}
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
