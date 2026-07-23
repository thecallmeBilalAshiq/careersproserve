import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-8">Privacy Policy</h1>
          
          <div className="prose-invert max-w-none space-y-6 text-muted-foreground">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-3">1. Introduction</h2>
              <p>
                CareerHub Pro (&quot;Company&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) operates the website and mobile applications.
                This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-3">2. Information Collection and Use</h2>
              <p>We collect several types of information for various purposes:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Personal identification information (name, email, phone, etc.)</li>
                <li>Professional information (resume, work history, skills)</li>
                <li>Usage data (pages visited, time spent, etc.)</li>
                <li>Device information (IP address, browser type, etc.)</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-3">3. Use of Data</h2>
              <p>We use the collected data for various purposes:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>To provide and maintain our Service</li>
                <li>To notify you about changes to our Service</li>
                <li>To allow you to participate in interactive features of our Service</li>
                <li>To provide customer care and support</li>
                <li>To gather analysis or valuable information to improve our Service</li>
                <li>To monitor the usage of our Service</li>
                <li>To detect, prevent and address technical issues</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-3">4. Security of Data</h2>
              <p>
                The security of your data is important to us but remember that no method of transmission over the Internet or method of electronic 
                storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its 
                absolute security.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-3">5. Changes to This Privacy Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-3">6. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at privacy@careerhub.com
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
