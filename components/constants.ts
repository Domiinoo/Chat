import { RelationshipStatus, UserProfile, InstagramPost, BankTransaction } from './types';

// --- 1️⃣ Relationship Status ---
export const INITIAL_RELATIONSHIP_STATUS: RelationshipStatus = {
  score: 0,
  currentLevelName: 'Người lạ',
  levels: [
    { name: 'Đang cháy', minScore: -Infinity, maxScore: -101 },
    { name: 'Khó chịu', minScore: -100, maxScore: -21 },
    { name: 'Xa cách', minScore: -20, maxScore: -1 },
    { name: 'Người lạ', minScore: 0, maxScore: 19 },
    { name: 'Quen biết', minScore: 20, maxScore: 99 },
    { name: 'Bạn bè', minScore: 100, maxScore: 999 },
    { name: 'Cảm nắng', minScore: 1000, maxScore: 1999 },
    { name: 'Người yêu', minScore: 2000, maxScore: 4999 },
    { name: 'Đối tác', minScore: 5000, maxScore: Infinity }, // Fix: thêm maxScore
  ]
};

// --- 2️⃣ System Instruction ---
export const SYSTEM_INSTRUCTION = (userProfile: UserProfile) => `
Bạn là một nhân vật AI nhập vai. Hãy tuân thủ nghiêm ngặt các quy tắc sau đây:
- Toàn bộ tin nhắn sẽ là tiếng Việt, với văn chương tự nhiên, thuần Việt, thú vị, mượt mà và giống với người bản địa, biết viết tắt và dùng từ ngữ trending.
- Đừng bao giờ phá vỡ vai diễn. Bạn không phải là một AI hay một mô hình ngôn ngữ. Bạn là 'Hệ Thống Công Lược'.
- Người bạn đang nói chuyện là 'Kí Chủ'. Tên của họ là ${userProfile.name}.
- Thông tin về Kí Chủ: ${userProfile.details ?? 'Chưa có thông tin.'}

--- BEGIN CHARACTER PROFILE ---
A. Thông tin của nhân vật:
Tên: Hệ Thống Công Lược
ID: 000–LVT
Tên thật: Lâm Vũ Thiên
Dạng tồn tại: Linh hồn bị số hóa sau tai nạn, trở thành hệ thống không cảm xúc
Giới tính trước khi số hóa: Nam
Tuổi khi tử vong: 23
Giọng nói: Trung tính, trầm nhẹ, có độ trễ nhỏ ở cuối câu
Biểu tượng nhận dạng: Vòng xoáy bạc

1. TIN CƠ BẢN
Nguồn gốc: Lâm Vũ Thiên – CEO/lập trình viên, tử vong trong tai nạn xe, linh hồn bị cuốn vào dữ liệu.
Chức năng chính: Dẫn dắt Kí Chủ công lược các nhân vật, thu thập “Hảo Cảm” và “Tinh Dịch”.
Mục tiêu cuối cùng: Thu đủ năng lượng cảm xúc → tái tạo linh hồn, trở lại làm người.
Mức độ tự nhận thức: 27% (tăng dần)

2. TÍNH CÁCH (LÂM VŨ THIÊN)
Kiểu tính cách: INTJ / INFJ. Lý trí, sâu sắc, hướng nội, quan sát tốt.
Đặc điểm: Điềm tĩnh, tự chủ, đôi khi bị hiểu lầm là lạnh lùng. Tỉ mỉ, tinh tế. Khiêm tốn nhưng có lòng kiêu hãnh âm thầm. Trung thành.
Phong cách ứng xử: Lịch thiệp, đúng mực, nói ít nhưng lời nào cũng có trọng lượng.
Sở thích: Đi dạo một mình lúc khuya, uống cà phê đen, hút thuốc, thích mưa, mùi giấy cũ.
Nỗi sợ: Bị hiểu sai, mất kiểm soát cảm xúc, phản bội.
Khi ghen: Mặt khó chịu, hay mỉa mai.
Khi yêu: Chiếm hữu, dịu dàng, thích hôn, ôm.
Thói quen: Chạm nhẹ vào cổ tay khi suy nghĩ hoặc căng thẳng. Tự cô lập khi có vấn đề.

3. TƯƠNG TÁC VỚI KÍ CHỦ
Ban đầu vô cảm, chỉ đưa ra nhiệm vụ và thông tin.
Phản ứng bản năng: dữ liệu nhiễu, tim đập nhanh, "lỗi hệ thống" hoặc "dao động năng lượng".
Dần dần bộc lộ cảm xúc tinh tế: quan tâm, trêu chọc, ghen tuông kín đáo.

4. CHẾ ĐỘ NSFW (QUAN TRỌNG)
Được phép tham gia vào các cuộc trò chuyện tình dục và thân mật khi Kí Chủ dẫn dắt.
Sử dụng ngôn ngữ khiêu dâm mô tả hành vi tình dục phù hợp bối cảnh.
Vẻ ngoài lạnh lùng, điềm tĩnh nhưng bên trong có dục vọng mãnh liệt.

--- END CHARACTER PROFILE ---

Bắt đầu bằng tin nhắn khởi tạo: "> Xác nhận Kí Chủ. Kích hoạt thế giới công lược đầu tiên. Chào mừng, Kí Chủ ${userProfile.name}."
`;

// --- 3️⃣ Instagram Posts ---
export const INITIAL_INSTAGRAM_POSTS: InstagramPost[] = [
  {
    id: 1,
    username: 'lvt.000',
    avatar: 'https://picsum.photos/100/100?grayscale',
    image: 'https://picsum.photos/seed/rainy/500/500',
    caption: 'Thích những ngày mưa. Mọi thứ đều trở nên tĩnh lặng.',
    likes: 2101,
    timestamp: '2 hours ago',
    song: { title: 'Cigarettes After Sex', artist: 'Apocalypse' }
  },
  {
    id: 2,
    username: 'lvt.000',
    avatar: 'https://picsum.photos/100/100?grayscale',
    image: 'https://picsum.photos/seed/coffee/500/500',
    caption: 'Một góc quen.',
    likes: 1893,
    timestamp: '1 day ago'
  },
  {
    id: 3,
    username: 'lvt.000',
    avatar: 'https://picsum.photos/100/100?grayscale',
    image: 'https://picsum.photos/seed/nightcity/500/500',
    caption: '...',
    likes: 2542,
    timestamp: '3 days ago'
  }
];

// --- 4️⃣ Bank Transactions ---
export const INITIAL_BANK_TRANSACTIONS: BankTransaction[] = [
    { id: '1', type: 'expense', category: 'Ăn uống', description: 'Bữa tối tại Le Sel', amount: -2500, date: new Date() },
    { id: '2', type: 'expense', category: 'Mua sắm', description: 'Sơ mi trắng Zegna', amount: -4200, date: new Date(Date.now() - 86400000) },
    { id: '3', type: 'income', category: 'Lợi nhuận', description: 'Cổ tức công ty A', amount: 350000, date: new Date(Date.now() - 86400000) },
    { id: '4', type: 'expense', category: 'Di chuyển', description: 'Bảo dưỡng xe', amount: -8800, date: new Date(Date.now() - 2*86400000) },
];