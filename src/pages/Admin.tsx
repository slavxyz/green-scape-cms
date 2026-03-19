import { useState } from "react";
import { Link } from "react-router-dom";
import { useSiteData } from "@/contexts/SiteDataContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Plus, Trash2, Save, Leaf } from "lucide-react";
import { toast } from "sonner";
import type { Service, Project, BlogPost } from "@/data/siteData";

export default function Admin() {
  const { data, updateServices, updateProjects, updateBlogPosts, updateAbout, updateCompanyInfo } = useSiteData();

  // Local editing state
  const [services, setServices] = useState<Service[]>(data.services);
  const [projects, setProjects] = useState<Project[]>(data.projects);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(data.blogPosts);
  const [about, setAbout] = useState(data.about);
  const [companyName, setCompanyName] = useState(data.companyName);
  const [phone, setPhone] = useState(data.phone);

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
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="blog">Blog</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
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
                  <Label>Our Story</Label>
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
        </Tabs>
      </div>
    </div>
  );
}
