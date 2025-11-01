-- إضافة بيانات تجريبية للمحامين
INSERT INTO lawyers (id, name, email, phone, specialty, license_number, experience_years, hourly_rate, rating, total_cases, bio, registration_status, license_verified, is_online, last_seen, avatar_url) VALUES
('11111111-1111-1111-1111-111111111111', 'د. أحمد محمود', 'demo@lawyer.com', '+966501234567', 'القانون التجاري', 'LAW-2024-001', 15, 500, 4.9, 245, 'محامي متخصص في القانون التجاري مع خبرة 15 عاماً في التقاضي وحل النزاعات التجارية', 'approved', true, true, NOW(), 'https://i.pravatar.cc/150?img=12'),
('22222222-2222-2222-2222-222222222222', 'د. سارة العلي', 'sarah.ali@demo.com', '+966502345678', 'القانون الجنائي', 'LAW-2024-002', 12, 450, 4.8, 198, 'محامية جنائية متميزة مع سجل حافل في الدفاع عن القضايا الجنائية المعقدة', 'approved', true, true, NOW(), 'https://i.pravatar.cc/150?img=5'),
('33333333-3333-3333-3333-333333333333', 'أ. خالد السعيد', 'khalid.said@demo.com', '+966503456789', 'قانون الأسرة', 'LAW-2024-003', 10, 400, 4.7, 167, 'محامي متخصص في قضايا الأحوال الشخصية والأسرة مع تركيز على الحلول الودية', 'approved', true, false, NOW() - INTERVAL '2 hours', 'https://i.pravatar.cc/150?img=8'),
('44444444-4444-4444-4444-444444444444', 'د. فاطمة حسن', 'fatima.hassan@demo.com', '+966504567890', 'القانون العقاري', 'LAW-2024-004', 8, 380, 4.6, 134, 'محامية متخصصة في القانون العقاري والملكية الفكرية', 'approved', true, false, NOW() - INTERVAL '5 hours', 'https://i.pravatar.cc/150?img=9'),
('55555555-5555-5555-5555-555555555555', 'أ. محمد الراشد', 'mohammed.rashed@demo.com', '+966505678901', 'قانون العمل', 'LAW-2024-005', 7, 350, 4.5, 112, 'محامي متخصص في قضايا العمل والتأمينات الاجتماعية', 'approved', true, true, NOW(), 'https://i.pravatar.cc/150?img=11'),
('66666666-6666-6666-6666-666666666666', 'د. نورة المطيري', 'noura.matiri@demo.com', '+966506789012', 'القانون الدولي', 'LAW-2024-006', 14, 550, 4.9, 223, 'محامية متخصصة في القانون الدولي والتحكيم التجاري الدولي', 'approved', true, false, NOW() - INTERVAL '1 day', 'https://i.pravatar.cc/150?img=10'),
('77777777-7777-7777-7777-777777777777', 'أ. عبدالله القحطاني', 'abdullah.qahtani@demo.com', '+966507890123', 'القانون الإداري', 'LAW-2024-007', 11, 420, 4.7, 189, 'محامي متخصص في القضايا الإدارية والمنازعات الحكومية', 'approved', true, false, NOW() - INTERVAL '3 hours', 'https://i.pravatar.cc/150?img=13'),
('88888888-8888-8888-8888-888888888888', 'د. ريم الشمري', 'reem.shammari@demo.com', '+966508901234', 'قانون الشركات', 'LAW-2024-008', 9, 430, 4.8, 156, 'محامية متخصصة في تأسيس الشركات والاستشارات القانونية للشركات الناشئة', 'approved', true, true, NOW(), 'https://i.pravatar.cc/150?img=6'),
('99999999-9999-9999-9999-999999999999', 'أ. سلطان الدوسري', 'sultan.dosari@demo.com', '+966509012345', 'القانون البحري', 'LAW-2024-009', 13, 480, 4.6, 201, 'محامي متخصص في القانون البحري والنقل البحري', 'approved', true, false, NOW() - INTERVAL '6 hours', 'https://i.pravatar.cc/150?img=14'),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'د. منى العتيبي', 'mona.otaibi@demo.com', '+966500123456', 'القانون الضريبي', 'LAW-2024-010', 6, 370, 4.5, 98, 'محامية متخصصة في القانون الضريبي والزكاة', 'approved', true, true, NOW(), 'https://i.pravatar.cc/150?img=7');

-- إضافة عميل تجريبي
INSERT INTO clients (id, name, email, phone, total_consultations, total_spent) VALUES
('cccccccc-cccc-cccc-cccc-cccccccccccc', 'عميل تجريبي', 'demo@client.com', '+966511111111', 5, 2500);

-- إضافة استشارات تجريبية
INSERT INTO consultations (id, client_id, lawyer_id, type, status, duration_minutes, amount, rating, review, started_at, ended_at) VALUES
('dddddddd-dddd-dddd-dddd-dddddddddddd', 'cccccccc-cccc-cccc-cccc-cccccccccccc', '11111111-1111-1111-1111-111111111111', 'video', 'completed', 30, 500, 5, 'استشارة ممتازة، المحامي محترف جداً', NOW() - INTERVAL '5 days', NOW() - INTERVAL '5 days' + INTERVAL '30 minutes'),
('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'cccccccc-cccc-cccc-cccc-cccccccccccc', '22222222-2222-2222-2222-222222222222', 'chat', 'completed', 20, 300, 4, 'خدمة جيدة وسريعة', NOW() - INTERVAL '3 days', NOW() - INTERVAL '3 days' + INTERVAL '20 minutes');

-- إضافة قضايا تجريبية
INSERT INTO legal_cases (id, title, description, category, status, budget_min, budget_max, urgency, is_auction, auction_end_date) VALUES
('ffffffff-ffff-ffff-ffff-ffffffffffff', 'نزاع تجاري بين شركاء', 'نزاع حول توزيع الأرباح وإدارة الشركة بين ثلاثة شركاء', 'تجاري', 'open', 5000, 10000, 'high', true, NOW() + INTERVAL '7 days'),
('10101010-1010-1010-1010-101010101010', 'قضية طلاق وحضانة', 'قضية طلاق متنازع عليه مع مسائل حضانة الأطفال', 'أحوال شخصية', 'open', 3000, 7000, 'normal', false, NULL),
('20202020-2020-2020-2020-202020202020', 'نزاع عقاري حول ملكية', 'نزاع على ملكية قطعة أرض بين ورثة', 'عقاري', 'open', 8000, 15000, 'high', true, NOW() + INTERVAL '5 days');