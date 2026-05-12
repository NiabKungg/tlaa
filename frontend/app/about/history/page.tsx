import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const API = process.env.INTERNAL_API_URL || "http://localhost:8000";

interface PageSection {
  id: number;
  page_name: string;
  section_key: string;
  title: string | null;
  subtitle: string | null;
  body: string | null;
  image_url: string | null;
  link_url: string | null;
  link_text: string | null;
  order: number;
  is_active: boolean;
  metadata_json: any;
}

async function fetchSections(): Promise<PageSection[]> {
  try {
    const res = await fetch(`${API}/api/public/pages/about-history`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

async function fetchFooter(): Promise<any[]> {
  try {
    const res = await fetch(`${API}/api/public/home/footer`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

// Default content used when CMS has no data yet
const DEFAULT_SECTIONS: PageSection[] = [
  {
    id: 0,
    page_name: "about-history",
    section_key: "hero",
    title: "ประวัติสมาคมประกันชีวิตไทย",
    subtitle: "The Thai Life Assurance Association",
    body: null,
    image_url: null,
    link_url: null,
    link_text: null,
    order: 0,
    is_active: true,
    metadata_json: null,
  },
  {
    id: 0,
    page_name: "about-history",
    section_key: "intro",
    title: "ความเป็นมา",
    subtitle: null,
    body: `ผู้ดำเนินกิจการธุรกิจประกันชีวิตในประเทศไทย ได้ประชุมปรึกษาหารือในการที่จะจัดตั้งองค์กรกลาง สำหรับธุรกิจประกันชีวิตขึ้น และ ได้จัดตั้ง "คณะทำงาน" ขึ้นมาจดทะเบียนจัดตั้ง สมาคมประกันชีวิตไทย เมื่อวันที่ 2 พฤศจิกายน 2510 ดำเนินงานในลักษณะสมาคมการค้า ซึ่งสมาชิกประกอบด้วย บริษัทประกันชีวิตที่ดำเนินธุรกิจ ประกันชีวิตในประเทศไทย โดยมีวัตถุประสงค์ในการ ดำเนินงานเพื่อส่งเสริมกิจกรรมธุรกิจประกันชีวิต

สมาคมประกันชีวิตไทย ได้ดำเนินบทบาทมาตั้งแต่การเป็นศูนย์กลางให้กับบริษัทสมาชิก ซึ่งเป็นผู้ดำเนินกิจการธุรกิจ ประกันชีวิตในประเทศ ได้ร่วมพบปะ แลกเปลี่ยนความคิดเห็น เพื่อพัฒนาธุรกิจในทิศทางเดียวกัน อีกทั้ง ยังทำหน้าที่เป็นตัวแทนของบริษัทสมาชิก ในการเจรจา ติดต่อ ประสานงานกับส่วนราชการที่เกี่ยวข้อง ในเรื่องนโยบายกฎระเบียบ ข้อบังคับ ที่เกี่ยวข้อง กับการประกอบธุรกิจประกันชีวิต`,
    image_url: null,
    link_url: null,
    link_text: null,
    order: 1,
    is_active: true,
    metadata_json: null,
  },
  {
    id: 0,
    page_name: "about-history",
    section_key: "milestone",
    title: "เหตุการณ์สำคัญ",
    subtitle: null,
    body: `2510 - จดทะเบียนจัดตั้งสมาคมประกันชีวิตไทย
2520 - ขยายบทบาทเป็นศูนย์กลางสำหรับบริษัทสมาชิก
2530 - เริ่มจัดโครงการอบรมตัวแทนประกันชีวิต
2540 - จัดตั้งศูนย์สอบใบอนุญาตตัวแทนประกันชีวิต
2550 - พัฒนาระบบสอบออนไลน์
2560 - ครบรอบ 50 ปี สมาคมประกันชีวิตไทย`,
    image_url: null,
    link_url: null,
    link_text: null,
    order: 2,
    is_active: true,
    metadata_json: null,
  },
  {
    id: 0,
    page_name: "about-history",
    section_key: "image-1",
    title: "สำนักงานสมาคมประกันชีวิตไทย",
    subtitle: "อาคารสมาคมประกันชีวิตไทย กรุงเทพมหานคร",
    body: null,
    image_url: "/logo.png",
    link_url: null,
    link_text: null,
    order: 3,
    is_active: true,
    metadata_json: null,
  },
];

function getSection(sections: PageSection[], key: string): PageSection | undefined {
  return sections.find((s) => s.section_key === key);
}

export default async function AboutHistoryPage() {
  const [sections, footerItems] = await Promise.all([fetchSections(), fetchFooter()]);
  const data = sections.length > 0 ? sections : DEFAULT_SECTIONS;

  const hero = getSection(data, "hero");
  const intro = getSection(data, "intro");
  const milestone = getSection(data, "milestone");
  const image1 = getSection(data, "image-1");

  // Collect all body-* sections for additional content blocks
  const extraSections = data.filter(
    (s) => !["hero", "intro", "milestone", "image-1"].includes(s.section_key)
  );

  return (
    <main>
      <Header />

      {/* ── Hero Banner ── */}
      <section className="about-hero">
        <div className="about-hero__overlay" />
        <div className="container about-hero__inner">
          <h1 className="about-hero__title">{hero?.title || "ประวัติสมาคมประกันชีวิตไทย"}</h1>
          {hero?.subtitle && (
            <p className="about-hero__subtitle">{hero.subtitle}</p>
          )}
        </div>
      </section>

      {/* ── Breadcrumb ── */}
      <nav className="about-breadcrumb">
        <div className="container about-breadcrumb__inner">
          <a href="/">หน้าแรก</a>
          <span className="about-breadcrumb__sep">/</span>
          <a href="#">เกี่ยวกับสมาคมฯ</a>
          <span className="about-breadcrumb__sep">/</span>
          <span className="about-breadcrumb__current">ประวัติสมาคม</span>
        </div>
      </nav>

      {/* ── Content Area ── */}
      <div className="about-content">
        <div className="container about-content__layout">

          {/* Sidebar */}
          <aside className="about-sidebar">
            <h3 className="about-sidebar__title">เกี่ยวกับสมาคมฯ</h3>
            <ul className="about-sidebar__menu">
              <li><a href="/about/history" className="about-sidebar__link about-sidebar__link--active">ประวัติสมาคม</a></li>
              <li><a href="/about/vision" className="about-sidebar__link">วิสัยทัศน์ / พันธกิจ</a></li>
              <li><a href="/about/board" className="about-sidebar__link">คณะกรรมการบริหาร</a></li>
              <li><a href="/about/org-chart" className="about-sidebar__link">แผนภูมิการบริหาร</a></li>
              <li><a href="/about/committee" className="about-sidebar__link">คณะกรรมการสมาคม</a></li>
              <li><a href="/about/subcommittee" className="about-sidebar__link">คณะอนุกรรมการสมาคม</a></li>
              <li><a href="/members" className="about-sidebar__link">บริษัทสมาชิก</a></li>
              <li><a href="/about/roles" className="about-sidebar__link">บทบาทหน้าที่</a></li>
              <li><a href="/about/csr" className="about-sidebar__link">กิจกรรมเพื่อสังคม</a></li>
              <li><a href="/about/goals" className="about-sidebar__link">เป้าหมายและจุดประสงค์</a></li>
              <li><a href="/about/policy" className="about-sidebar__link">นโยบายบริหาร</a></li>
              <li><a href="/about/privacy" className="about-sidebar__link">นโยบายคุ้มครองข้อมูลส่วนบุคคล</a></li>
            </ul>
          </aside>

          {/* Main Content */}
          <article className="about-main">
            {/* Intro Section */}
            {intro && (
              <section className="about-section">
                <h2 className="about-section__title">
                  <span className="about-section__title-icon">📜</span>
                  {intro.title}
                </h2>
                <div className="about-section__body">
                  {intro.body?.split("\n").map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </section>
            )}

            {/* Image Block */}
            {image1 && image1.image_url && (
              <section className="about-section about-section--image">
                <div className="about-image-block">
                  <img src={image1.image_url} alt={image1.title || ""} />
                  {image1.title && (
                    <div className="about-image-block__caption">
                      <h4>{image1.title}</h4>
                      {image1.subtitle && <p>{image1.subtitle}</p>}
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* Milestone / Timeline */}
            {milestone && (
              <section className="about-section">
                <h2 className="about-section__title">
                  <span className="about-section__title-icon">📅</span>
                  {milestone.title}
                </h2>
                <div className="about-timeline">
                  {milestone.body?.split("\n").map((line, i) => {
                    const parts = line.split(" - ");
                    const year = parts[0]?.trim();
                    const desc = parts.slice(1).join(" - ").trim();
                    return (
                      <div key={i} className="about-timeline__item">
                        <div className="about-timeline__dot" />
                        <div className="about-timeline__year">{year}</div>
                        <div className="about-timeline__desc">{desc}</div>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Extra CMS Sections */}
            {extraSections.map((section) => (
              <section key={section.id || section.section_key} className="about-section">
                {section.title && (
                  <h2 className="about-section__title">
                    <span className="about-section__title-icon">📄</span>
                    {section.title}
                  </h2>
                )}
                {section.image_url && (
                  <div className="about-image-block">
                    <img src={section.image_url} alt={section.title || ""} />
                  </div>
                )}
                {section.body && (
                  <div className="about-section__body">
                    {section.body.split("\n").map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                )}
              </section>
            ))}
          </article>
        </div>
      </div>

      <Footer content={footerItems as any} />
    </main>
  );
}
