import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Hr,
} from "@react-email/components";

export default function Layout({ children }) {
  return (
    <Html>
      <Head />
      <Body style={{ background: "#f7f3f3", padding: "20px", fontFamily: "Arial" }}>
        <Container
          style={{
            background: "#ffffff",
            borderRadius: "14px",
            padding: "28px",
            maxWidth: "600px",
            margin: "auto",
            boxShadow: "0 4px 15px rgba(0,0,0,0.08)"
          }}
        >
          {/* HEADER */}
          <Section style={{ textAlign: "center" }}>
            <Text style={{ color: "#993333", fontSize: "26px", fontWeight: "bold" }}>
              Amaltas Furniture & Modular Kitchens
            </Text>
          </Section>

          <Hr style={{ borderColor: "#eedddd", marginBottom: "20px" }} />

          {/* MAIN CONTENT */}
          {children}

          <Hr style={{ borderColor: "#eedddd", marginTop: "28px" }} />

          {/* FOOTER */}
          <Text
            style={{ textAlign: "center", fontSize: "12px", color: "#777", marginTop: "12px" }}
          >
            © 2025 Amaltas Furniture & Modular Kitchens, Dehradun.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
