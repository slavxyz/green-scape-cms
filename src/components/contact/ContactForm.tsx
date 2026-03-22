import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Please enter a valid email address").max(255),
  subject: z.string().trim().min(1, "Subject is required").max(200),
  inquiryType: z.string().optional(),
  message: z.string().trim().min(1, "Message is required").max(2000),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();

  const INQUIRY_TYPES = [
    { value: "feedback", label: t("contact.inquiry.feedback") },
    { value: "collaboration", label: t("contact.inquiry.collaboration") },
    { value: "support", label: t("contact.inquiry.support") },
    { value: "general", label: t("contact.inquiry.general") },
  ];

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", subject: "", inquiryType: "", message: "" },
  });

  const onSubmit = async (values: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      await new Promise((res) => setTimeout(res, 1000));
      const existing = JSON.parse(localStorage.getItem("contact_messages") || "[]");
      existing.push({ ...values, submittedAt: new Date().toISOString() });
      localStorage.setItem("contact_messages", JSON.stringify(existing));
      toast({ title: t("contact.successTitle"), description: t("contact.successDesc") });
      form.reset();
    } catch {
      toast({ title: t("contact.errorTitle"), description: t("contact.errorDesc"), variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField control={form.control} name="name" render={({ field }) => (
            <FormItem>
              <FormLabel>{t("contact.name")} *</FormLabel>
              <FormControl><Input placeholder={t("contact.namePlaceholder")} {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="email" render={({ field }) => (
            <FormItem>
              <FormLabel>{t("contact.email")} *</FormLabel>
              <FormControl><Input type="email" placeholder={t("contact.emailPlaceholder")} {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField control={form.control} name="subject" render={({ field }) => (
            <FormItem>
              <FormLabel>{t("contact.subject")} *</FormLabel>
              <FormControl><Input placeholder={t("contact.subjectPlaceholder")} {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="inquiryType" render={({ field }) => (
            <FormItem>
              <FormLabel>{t("contact.inquiryType")}</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger><SelectValue placeholder={t("contact.selectType")} /></SelectTrigger>
                </FormControl>
                <SelectContent>
                  {INQUIRY_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} />
        </div>

        <FormField control={form.control} name="message" render={({ field }) => (
          <FormItem>
            <FormLabel>{t("contact.message")} *</FormLabel>
            <FormControl><Textarea placeholder={t("contact.messagePlaceholder")} rows={5} {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
          {isSubmitting ? t("contact.sending") : (<><Send className="mr-2 h-4 w-4" />{t("contact.send")}</>)}
        </Button>
      </form>
    </Form>
  );
}
