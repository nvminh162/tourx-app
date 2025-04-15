const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Indochina Grand - Một đặc sản trên vịnh Hạ Long",
      image: "https://minio.fares.vn/mixivivu-dev/tour/ship/blog/wewxg0swxjtmez6m.webp",
      description: "Hạ Long là một trong những điểm đến du lịch nổi tiếng nhất của Việt Nam...",
      date: "25/02/2025",
      link: "/blog-detail/indochine-grand-kiet-tac-giua-vinh-di-san"
    },
    {
      id: 2,
      title: "Những điểm tham quan nổi tiếng tại Hạ Long",
      image: "https://minio.fares.vn/mixivivu-dev/tour/blog/images/cd7yt8dvnlvchz20.webp",
      description: "Hạ Long có rất nhiều điểm tham quan hấp dẫn mà du khách không thể bỏ qua...",
      date: "24/02/2025",
      link: "/blog-detail/nhung-diem-tham-quan-noi-tieng-tai-ha-long"
    },
    {
      id: 3,
      title: "Những món ăn bạn nhất định phải thử khi đến Hạ Long",
      image: "https://minio.fares.vn/mixivivu-dev/tour/blog/images/fbbod6i06tfz0quo.webp",
      description: "Hà Nội không chỉ là thủ đô mà còn là thiên đường của những người yêu ẩm thực...",
      date: "24/02/2025",
      link: "/blog-detail/nhung-mon-an-ban-phai-thu-khi-den-ha-long"
    },
    {
      id: 4,
      title: "Indochine Grand - kiệt tác giữa vịnh di sản",
      image: "https://minio.fares.vn/mixivivu-dev/tour/blog/images/fjtg4ur7u4lecp8p.webp",
      description: "Indochine Grand - chính thức ra mắt vào năm 2025, là thành viên mới nhất trong chuỗi du thuyền đẳng cấp Indochine.",
      date: "18/02/2025",
      link: "/blog-detail/indochine-grand-kiet-tac-giua-vinh-di-san"
    },
    {
      id: 5,
      title: "Huế - thành phố của di sản và lễ hội",
      image: "https://minio.fares.vn/mixivivu-dev/tour/blog/images/cvnwx9jc8snptjyj.webp",
      description: "Vùng đất cố đô với hàng trăm lễ hội khác nhau mang màu sắc đặc trưng riêng đem lại cho du khách những trải nghiệm thú vị.",
      date: "12/02/2025",
      link: "/blog-detail/hue-thanh-pho-cua-di-san-va-le-hoi"
    },
    {
      id: 6,
      title: "Top 5 chùa cầu duyên nổi tiếng ở Hà Nội",
      image: "https://minio.fares.vn/mixivivu-dev/tour/blog/images/inv4xmheomnfuy55.webp",
      description: "Hà Nội, thủ đô ngàn năm văn hiến, không chỉ nổi tiếng với những danh lam thắng cảnh đẹp mà còn là nơi tập trung nhiều ngôi chùa linh thiêng.",
      date: "10/02/2025",
      link: "/blog-detail/top-5-chua-cau-duyen-noi-tieng-o-ha-noi"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Hạ Long: Khám phá Sự đặc sắc và Cập nhật tin tức mới nhất
          </h1>
          <p className="text-gray-500">
            Hạ Long: Bí mật và Cuộc sống trong Vịnh - Khám phá và Cập nhật những tin tức hấp dẫn từ điểm đến tuyệt vời này.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white p-4 rounded-lg shadow-lg cursor-pointer"
              onClick={() => window.location.href = post.link}
            >
              <img src={post.image} className="rounded mb-4" alt={post.title} />
              <h2 className="text-xl font-bold mb-2">{post.title}</h2>
              <p className="text-gray-500 text-sm mb-2">{post.date}</p>
              <p className="text-gray-700">{post.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
