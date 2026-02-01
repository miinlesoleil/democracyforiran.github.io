import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Mail, Send } from "lucide-react";
import { countries, generateMailtoLink } from "@/lib/emailData";
import { toast } from "sonner";

export default function Home() {
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      setSubmitted(true);
      toast.success("Ready to send! Click on any country to compose the email.");
    } else {
      toast.error("Please enter your name");
    }
  };

  const handleSendEmail = (country: typeof countries[0]) => {
    if (!name.trim()) {
      toast.error("Please enter your name first");
      return;
    }
    const mailtoLink = generateMailtoLink(country, name);
    window.location.href = mailtoLink;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative w-full py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="/images/hero-background.png"
            alt="Iran Revolution 2026"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-primary mb-4">
            Iran Revolution 2026
          </h1>
          <p className="text-xl text-foreground/80 mb-2">
            Advocacy Email Generator
          </p>
          <div className="h-1 w-24 bg-accent mx-auto mb-6"></div>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Send powerful advocacy emails to EU countries demanding action against the Islamic Republic's brutality and supporting the Iranian people's fight for freedom.
          </p>
        </div>
      </section>

      {/* Input Section */}
      <section className="py-12 px-4 bg-card/50">
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-2">
                Your Name (for email signature)
              </label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 text-base"
              />
              <p className="text-sm text-muted-foreground mt-2">
                Your name will be used to sign the emails sent to government officials.
              </p>
            </div>
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white py-3 text-lg font-semibold transition-all duration-200"
            >
              <Send className="mr-2 h-5 w-5" />
              Generate Email Links
            </Button>
          </form>
        </div>
      </section>

      {/* Countries Grid */}
      {submitted && (
        <section className="py-16 px-4 bg-background">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-2 text-center">
              Select Countries to Contact
            </h2>
            <div className="h-1 w-16 bg-accent mx-auto mb-12"></div>

            <div className="mb-12 p-6 bg-card border border-border/30 rounded-lg">
              <h3 className="font-semibold text-foreground mb-2">How it works:</h3>
              <ol className="space-y-2 text-sm text-foreground/70">
                <li>1. Click "Send Email" on any country card</li>
                <li>2. Your default email client will open with the pre-filled email</li>
                <li>3. Review the email and send it to the government officials</li>
                <li>4. Repeat for other countries to maximize impact</li>
              </ol>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {countries.map((country) => (
                <Card
                  key={country.code}
                  className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50"
                >
                  <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-6 border-b border-border/30">
                    <h3 className="text-2xl font-bold text-foreground mb-1">
                      {country.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {country.language}
                    </p>
                  </div>
                  <div className="p-6">
                    <p className="text-sm text-foreground/70 mb-4">
                      Send an advocacy email in {country.language} to government officials.
                    </p>
                    <Button
                      onClick={() => handleSendEmail(country)}
                      className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold transition-all duration-200"
                    >
                      <Mail className="mr-2 h-4 w-4" />
                      Send Email
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-card border-t border-border/30 py-8 px-4 text-center text-sm text-muted-foreground">
        <p>
          Stand with the Iranian people. Demand action. Support the revolution for freedom and democracy.
        </p>
        <p className="mt-2 text-xs">
          Iran Revolution 2026 • Advocacy for Human Rights and Democratic Transition
        </p>
      </footer>
    </div>
  );
}
