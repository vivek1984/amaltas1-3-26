import React from "react";
import { Head } from "@inertiajs/react";
import Welcome from "../Welcome";

export default function TermsOfUse({ clusters = [] }) {
  return (
    <>
      {/* SEO + OG Tags */}
      <Head>
        <title>Terms of Use | Amaltas Furniture</title>

        <meta
          name="description"
          content="Read the Terms of Use for Amaltas Furniture. Learn about website usage, orders, payments, intellectual property, and legal policies governing our services."
        />

        <link
          rel="canonical"
          href="https://www.amaltasfurniture.com/terms-of-use"
        />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="Terms of Use | Amaltas Furniture"
        />
        <meta
          property="og:description"
          content="Understand the terms and conditions governing the use of Amaltas Furniture’s website, products, and services."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://www.amaltasfurniture.com/terms-of-use"
        />
        <meta
          property="og:image"
          content="https://www.amaltasfurniture.com/images/terms-of-use-og.jpg"
        />
      </Head>

      <Welcome clusters={clusters}>
        <div className="max-w-4xl mx-auto px-4 py-8 text-gray-700 text-sm leading-relaxed">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Terms of Use
          </h1>

          <p className="mb-4">
            Welcome to <strong>Amaltas Furniture</strong>. By accessing or using
            our website, you agree to be bound by these Terms of Use. If you do
            not agree with any part of these terms, please do not use our
            website.
          </p>

          <h2 className="text-lg font-semibold text-gray-900 mt-6 mb-2">
            1. Use of the Website
          </h2>
          <p className="mb-4">
            This website is intended for browsing products, placing orders, and
            obtaining information about Amaltas Furniture. You agree to use
            this website only for lawful purposes and in a manner that does not
            infringe the rights of others or restrict their use of the website.
          </p>

          <h2 className="text-lg font-semibold text-gray-900 mt-6 mb-2">
            2. Product Information
          </h2>
          <p className="mb-4">
            We make every effort to display accurate product descriptions,
            images, specifications, and prices. Due to the handcrafted nature
            of furniture, minor variations in color, finish, or design may
            occur. Amaltas Furniture reserves the right to update or correct
            information without prior notice.
          </p>

          <h2 className="text-lg font-semibold text-gray-900 mt-6 mb-2">
            3. Orders & Pricing
          </h2>
          <p className="mb-4">
            Placing an order constitutes an offer to purchase. All orders are
            subject to acceptance, availability, and confirmation. Prices,
            offers, and availability may change without notice.
          </p>

          <h2 className="text-lg font-semibold text-gray-900 mt-6 mb-2">
            4. Payments
          </h2>
          <p className="mb-4">
            Payments must be made through authorized payment gateways. Amaltas
            Furniture does not store sensitive payment information such as
            debit or credit card details.
          </p>

          <h2 className="text-lg font-semibold text-gray-900 mt-6 mb-2">
            5. Intellectual Property
          </h2>
          <p className="mb-4">
            All content on this website, including text, images, designs,
            logos, videos, and graphics, is the intellectual property of
            Amaltas Furniture and is protected by applicable laws. Unauthorized
            use is strictly prohibited.
          </p>

          <h2 className="text-lg font-semibold text-gray-900 mt-6 mb-2">
            6. User Conduct
          </h2>
          <p className="mb-4">
            You agree not to misuse the website, introduce malicious code,
            attempt unauthorized access, or engage in any activity that could
            harm the website or its users.
          </p>

          <h2 className="text-lg font-semibold text-gray-900 mt-6 mb-2">
            7. Limitation of Liability
          </h2>
          <p className="mb-4">
            Amaltas Furniture shall not be liable for any indirect, incidental,
            or consequential damages arising from the use or inability to use
            this website or its products.
          </p>

          <h2 className="text-lg font-semibold text-gray-900 mt-6 mb-2">
            8. Third-Party Links
          </h2>
          <p className="mb-4">
            Our website may contain links to third-party websites. Amaltas
            Furniture is not responsible for the content or practices of such
            external websites.
          </p>

          <h2 className="text-lg font-semibold text-gray-900 mt-6 mb-2">
            9. Changes to These Terms
          </h2>
          <p className="mb-4">
            We reserve the right to update or modify these Terms of Use at any
            time. Continued use of the website constitutes acceptance of the
            revised terms.
          </p>

          <h2 className="text-lg font-semibold text-gray-900 mt-6 mb-2">
            10. Governing Law
          </h2>
          <p className="mb-4">
            These Terms of Use shall be governed by and interpreted in
            accordance with the laws of India.
          </p>

          <h2 className="text-lg font-semibold text-gray-900 mt-6 mb-2">
            11. Contact Information
          </h2>
          <p>
            For any questions regarding these Terms of Use, please contact
            Amaltas Furniture using the details provided on our website.
          </p>
        </div>
      </Welcome>
    </>
  );
}
