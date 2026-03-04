import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Download, Loader2, FileText, Building2, Calendar, CalendarCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { usePermit } from "@/hooks/use-permits";

export default function Home() {
  const { toast } = useToast();
  const [isDownloading, setIsDownloading] = useState(false);
  
  // Use id=1 as requested, which utilizes our hardcoded fallback data
  const { data: permit } = usePermit(1);

  // Enforce dark mode class on html/body to match exactly the required aesthetic
  useEffect(() => {
    document.documentElement.classList.add("dark");
    return () => document.documentElement.classList.remove("dark");
  }, []);

  const handleDownload = () => {
    setIsDownloading(true);

    setTimeout(() => {
      setIsDownloading(false);
      toast({
        title: "تم بدء التنزيل",
        description: "يتم الآن تنزيل التصريح الأمني الخاص بك.",
        className: "bg-card border-border rtl-text",
      });

      // كود التحميل الفعلي للملف
      const link = document.createElement('a');
      link.href = '/Campd.pdf'; // تأكد أن الملف داخل مجلد public
      link.download = 'Security_Permit.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

    }, 1500);
  };



  // Entry animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.5, 
        ease: "easeOut",
        staggerChildren: 0.1
      } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  return (
    <div className="min-h-screen w-full bg-background flex flex-col justify-center items-center p-4 rtl-text font-sans">
      
      {/* Decorative background element */}
      <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-[400px] bg-card p-8 rounded-[25px] shadow-[0_10px_40px_rgba(0,0,0,0.6)] border border-white/[0.04]"
      >
        {/* Logo Container */}
        <motion.div 
          variants={itemVariants}
          className="mx-auto w-[200px] bg-white p-2 rounded-[20px] mb-8 shadow-lg shadow-white/5 flex items-center justify-center overflow-hidden"
        >
          {/* استبدل logo.jpg باسم ملف الصورة الذي رفعته */}
          <img 
            src="/logo.jpg" 
            alt="C.S.O Logo" 
            className="w-full h-auto object-contain"
          />
        </motion.div>


        {/* Headers */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2 tracking-tight">
            تصريح جاهز للتنزيل
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed px-2">
            استخدم الزر أدناه لتنزيل نسخة PDF الرسمية للتصريح. يمكنك مشاركتها مع الجهات المعنية للتحقق.
          </p>
        </motion.div>

        {/* Info Boxes */}
        <div className="space-y-3 mb-8">
          <InfoBox 
            icon={<FileText className="w-4 h-4 text-primary" />}
            label="رقم التصريح" 
            value={permit?.permitNumber || "---"} 
          />
          <InfoBox 
            icon={<Building2 className="w-4 h-4 text-primary" />}
            label="الشركة" 
            value={permit?.company || "---"} 
          />
          <InfoBox 
            icon={<Calendar className="w-4 h-4 text-primary" />}
            label="تاريخ الإصدار" 
            value={permit?.issueDate || "---"} 
          />
          <InfoBox 
            icon={<CalendarCheck className="w-4 h-4 text-primary" />}
            label="تاريخ الانتهاء" 
            value={permit?.expiryDate || "---"} 
          />
        </div>

        {/* Action Button */}
        <motion.div variants={itemVariants} className="mt-4">
          <button 
            onClick={handleDownload}
            disabled={isDownloading}
            className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-[#26c6da] to-[#00acc1] text-black border-none py-4 px-6 rounded-[14px] text-lg font-bold cursor-pointer shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:shadow-cyan-500/30 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isDownloading ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <Download className="w-6 h-6" />
            )}
            <span>
              {isDownloading ? "جاري التجهيز..." : "اضغط لتنزيل التصريح (PDF)"}
            </span>
          </button>
        </motion.div>

        {/* Footer Note */}
        <motion.p 
          variants={itemVariants}
          className="text-xs text-muted-foreground text-center mt-5"
        >
          سيبدأ التنزيل مباشرة. إذا لم يبدأ، اضغط الزر مرة أخرى.
        </motion.p>
      </motion.div>
    </div>
  );
}

// Sub-component for the info boxes matching the precise requested style
function InfoBox({ label, value, icon }: { label: string, value: string, icon: React.ReactNode }) {
  return (
    <motion.div 
      variants={{
        hidden: { opacity: 0, x: 20 },
        visible: { opacity: 1, x: 0 }
      }}
      className="bg-input border border-border/60 rounded-[16px] p-4 text-right flex flex-col shadow-inner transition-colors hover:border-border group"
    >
      <div className="flex items-center justify-start gap-2 mb-1">
        <div className="opacity-70 group-hover:opacity-100 transition-opacity">
          {icon}
        </div>
        <span className="text-muted-foreground text-[13px] font-medium block">
          {label}
        </span>
      </div>
      <div className="text-foreground text-[19px] font-bold pr-6">
        {value}
      </div>
    </motion.div>
  );
}
