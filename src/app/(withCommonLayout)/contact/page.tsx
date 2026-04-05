import ContactBanner from "@/components/contact/contactBanner";
import ContactInfo from "@/components/contact/contactInfo";
import ContactSection from "@/components/contact/contactSection";
const ContactPage = () => {
  return (
    <div>
      <div>
        <ContactBanner></ContactBanner>

        <div className="my-12 container mx-auto space-y-10">
          <ContactInfo></ContactInfo>
          <ContactSection></ContactSection>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
