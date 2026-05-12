"use client";

import type { FooterContent as FooterContentType } from "@/lib/home-types";

const DEFAULT_FOOTER: FooterContentType[] = [
  {
    id: 1,
    section_key: "address",
    title: "สมาคมประกันชีวิตไทย",
    body: "เลขที่ 36/1 ซอยสะพานคู่ ถนนพระราม 4\nแขวงทุ่งมหาเมฆ เขตสาทร\nกรุงเทพมหานคร 10120",
    image_url: null,
    link_url: null,
    link_text: null,
    order: 0,
    is_active: true,
    created_at: "",
    updated_at: "",
  },
  {
    id: 2,
    section_key: "contact",
    title: "ติดต่อสมาคม",
    body: "โทรศัพท์: 02-679-6577\nโทรสาร: 02-679-6578\nEmail: info@tlaa.org",
    image_url: null,
    link_url: null,
    link_text: null,
    order: 1,
    is_active: true,
    created_at: "",
    updated_at: "",
  },
  {
    id: 3,
    section_key: "social",
    title: "ติดตามเราได้ที่",
    body: "Facebook|https://facebook.com\nYouTube|https://youtube.com\nLine|#",
    image_url: null,
    link_url: null,
    link_text: null,
    order: 2,
    is_active: true,
    created_at: "",
    updated_at: "",
  },
  {
    id: 4,
    section_key: "quick_links",
    title: "ลิงก์ที่เกี่ยวข้อง",
    body: "เว็บไซต์ คปภ.|https://oic.or.th\nสำนักงานคณะกรรมการกำกับ|#",
    image_url: null,
    link_url: null,
    link_text: null,
    order: 3,
    is_active: true,
    created_at: "",
    updated_at: "",
  },
];

function parseSocialLinks(body: string): { label: string; url: string }[] {
  return body.split("\n").filter(Boolean).map((line) => {
    const [label, url] = line.split("|");
    return { label: label?.trim() || "", url: url?.trim() || "#" };
  });
}

interface Props {
  content?: FooterContentType[];
}

export default function Footer({ content }: Props) {
  const data = content && content.length > 0 ? content : DEFAULT_FOOTER;

  const address = data.find((d) => d.section_key === "address");
  const contact = data.find((d) => d.section_key === "contact");
  const social = data.find((d) => d.section_key === "social");
  const quickLinks = data.find((d) => d.section_key === "quick_links");

  const socialLinks = social?.body ? parseSocialLinks(social.body) : [];
  const quickLinksItems = quickLinks?.body ? parseSocialLinks(quickLinks.body) : [];

  return (
    <footer id="footer" className="site-footer">
      <div className="site-footer__top">
        <div className="container">
          <div className="site-footer__grid">
            {/* Address */}
            {address && (
              <div className="site-footer__col">
                {address.image_url && (
                  <img
                    src={address.image_url}
                    alt="Logo"
                    className="site-footer__logo"
                  />
                )}
                <h4 className="site-footer__heading">{address.title}</h4>
                {address.body && (
                  <p className="site-footer__text">
                    {address.body.split("\n").map((line, i) => (
                      <span key={i}>
                        {line}
                        <br />
                      </span>
                    ))}
                  </p>
                )}
              </div>
            )}

            {/* Contact */}
            {contact && (
              <div className="site-footer__col">
                <h4 className="site-footer__heading">{contact.title}</h4>
                {contact.body && (
                  <p className="site-footer__text">
                    {contact.body.split("\n").map((line, i) => (
                      <span key={i}>
                        {line}
                        <br />
                      </span>
                    ))}
                  </p>
                )}
              </div>
            )}

            {/* Quick Links */}
            {quickLinks && (
              <div className="site-footer__col">
                <h4 className="site-footer__heading">{quickLinks.title}</h4>
                <ul className="site-footer__links">
                  {quickLinksItems.map((item, i) => (
                    <li key={i}>
                      <a href={item.url} target="_blank" rel="noopener noreferrer">
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Social */}
            {social && (
              <div className="site-footer__col">
                <h4 className="site-footer__heading">{social.title}</h4>
                <div className="site-footer__social">
                  {socialLinks.map((item, i) => (
                    <a
                      key={i}
                      href={item.url}
                      className="site-footer__social-link"
                      target="_blank"
                      rel="noopener noreferrer"
                      title={item.label}
                    >
                      {item.label === "Facebook" && (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                        </svg>
                      )}
                      {item.label === "YouTube" && (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.4 19.6C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 001.94-2A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
                        </svg>
                      )}
                      {item.label === "Line" && (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C6.48 2 2 5.58 2 10c0 3.54 3.14 6.54 7.38 7.62-.3 1.08-.97 3.96-.99 4.21 0 0-.02.17.09.23.11.07.24.02.24.02.32-.04 3.7-2.44 5.21-3.59.69.09 1.38.13 2.07.13 5.52 0 10-3.58 10-8 0-4.42-4.48-8-10-8z" />
                        </svg>
                      )}
                      {!["Facebook", "YouTube", "Line"].includes(item.label) && (
                        <span>{item.label}</span>
                      )}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="site-footer__bottom">
        <div className="container">
          <p>
            © {new Date().getFullYear()} สมาคมประกันชีวิตไทย | The Thai Life Assurance Association. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
