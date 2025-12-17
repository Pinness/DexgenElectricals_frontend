import TallyEmbed from "./TallyEmbed";

const ContactForm = () => {
  // The form ID is the last part of your URL: https://tally.so/r/EkKp2A -> EkKp2A
  return (
    <div className="w-full">
      <TallyEmbed formId="EkKp2A" />
    </div>
  );
};

export default ContactForm;
