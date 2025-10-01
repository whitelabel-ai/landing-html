import React from "react";

export default function Blog() {
  const posts = [
    {
      author: "Devgen & Media",
      date: "Aug 12, 2024",
      category: "Engineering",
      title: "How we deliver faster with solid processes",
      img: "/assets/img/home-03/blog/blog-01.jpg",
    },
    {
      author: "Devgen & Media",
      date: "Sep 01, 2024",
      category: "Design",
      title: "Design systems that scale across products",
      img: "/assets/img/home-03/blog/blog-02.jpg",
    },
    {
      author: "Devgen & Media",
      date: "Oct 07, 2024",
      category: "Product",
      title: "Validating ideas quickly with prototypes",
      img: "/assets/img/home-03/blog/blog-03.jpg",
    },
  ];

  return (
    <section className="dgm-blog-area">
      <div className="container">
        <div className="row align-items-center mb-40">
          <div className="col-lg-8">
            <h2 className="section-title">Insights &amp; articles</h2>
          </div>
          <div className="col-lg-4 text-lg-end">
            <a href="#" className="btn btn-outline-dark">
              Read all posts
            </a>
          </div>
        </div>

        <div className="row g-4">
          {posts.map((p, i) => (
            <div className="col-md-6 col-lg-4" key={`blog-${i}`}>
              <article className="dgm-blog-item h-100">
                <div className="dgm-blog-thumb">
                  <img src={p.img} alt={p.title} className="img-fluid" />
                </div>
                <div className="dgm-blog-content p-3">
                  <div className="dgm-blog-meta d-flex gap-2 flex-wrap mb-2">
                    <span className="dgm-blog-author">{p.author}</span>
                    <span className="dgm-blog-dot">•</span>
                    <span className="dgm-blog-date">{p.date}</span>
                    <span className="dgm-blog-dot">•</span>
                    <span className="dgm-blog-category">{p.category}</span>
                  </div>
                  <h4 className="dgm-blog-title">
                    <a href="#">{p.title}</a>
                  </h4>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}