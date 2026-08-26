import React from "react";
import { motion } from "motion/react";
import { Trophy } from "lucide-react";
import { StudentResult } from "../types";

interface RankCardProps {
  student: StudentResult;
  isFeatured?: boolean;
}

export const RankCard: React.FC<RankCardProps> = ({
  student,
  isFeatured = false,
}) => {
  const getBadgeStyle = () => {
    switch (student.badgeType) {
      case "gold":
        return {
          cardBorder:
            "border-amber-300 ring-2 ring-amber-400/20 bg-gradient-to-b from-amber-50/40 via-white to-white",
          rankBg:
            "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-extrabold shadow-md shadow-amber-500/20",
          scoreBadge: "bg-amber-100 text-amber-950 border-amber-300 font-bold",
        };
      case "silver":
        return {
          cardBorder:
            "border-slate-300 ring-1 ring-slate-400/20 bg-gradient-to-b from-slate-50/60 via-white to-white",
          rankBg:
            "bg-gradient-to-r from-slate-600 to-slate-700 text-white font-bold shadow-md shadow-slate-400/20",
          scoreBadge: "bg-slate-100 text-slate-900 border-slate-300 font-bold",
        };
      case "bronze":
        return {
          cardBorder:
            "border-amber-200 ring-1 ring-amber-300/20 bg-gradient-to-b from-orange-50/30 via-white to-white",
          rankBg:
            "bg-gradient-to-r from-amber-700 to-orange-700 text-white font-bold shadow-md shadow-amber-700/20",
          scoreBadge:
            "bg-orange-100 text-amber-950 border-orange-200 font-bold",
        };
      default:
        return {
          cardBorder: "border-slate-200 bg-white",
          rankBg: "bg-[#0F172A] text-white font-semibold",
          scoreBadge: "bg-slate-100 text-slate-800 border-slate-200",
        };
    }
  };

  const badgeStyle = getBadgeStyle();
  const studentPhoto = student.photo || student.image;
  const examLabel = student.examName || student.exam;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={`rounded-2xl border ${badgeStyle.cardBorder} p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden group`}
    >
      {/* Glow for top toppers */}
      {student.badgeType === "gold" && (
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/15 rounded-full blur-2xl pointer-events-none -mr-10 -mt-10" />
      )}

      <div>
        {/* Top Rank Banner & Year */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <span
            className={`text-[11px] uppercase tracking-wider px-3 py-1 rounded-full flex items-center gap-1.5 ${badgeStyle.rankBg}`}
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>{student.rankTitle || `Rank ${student.rank}`}</span>
          </span>
          <span className="text-xs font-semibold text-slate-400">
            {student.year}
          </span>
        </div>

        {/* Student Avatar + Key Info */}
        <div className="flex items-center gap-4 mb-4">
          <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-amber-400/60 shadow-md shrink-0">
            <img
              src={studentPhoto}
              alt={student.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          </div>
          <div>
            <h3 className="font-serif font-bold text-lg text-[#0F172A] leading-tight">
              {student.name}
            </h3>
            {student.school && (
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                {student.school}
              </p>
            )}
            <span className="inline-block mt-1 text-[11px] font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
              {student.gradeLevel} • {examLabel}
            </span>
          </div>
        </div>

        {/* Score Display Card */}
        <div
          className={`p-3.5 rounded-xl border flex items-center justify-between mb-4 ${badgeStyle.scoreBadge}`}
        >
          <div>
            <div className="text-[10px] uppercase font-bold tracking-wider text-slate-600">
              Score Achieved
            </div>
            <div className="text-2xl font-serif font-extrabold text-[#0F172A] mt-0.5">
              {String(student.score).includes("%")
                ? student.score
                : `${student.score}%`}
            </div>
          </div>
          {student.percentile && (
            <div className="text-right text-xs text-emerald-700 font-bold">
              {student.percentile} Percentile
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
