import React from 'react';
import { Link } from 'react-router-dom';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowUpRight,
  Award,
  ShieldCheck,
  Instagram,
  Facebook,
  Youtube,
  Linkedin,
  Sparkles,
  Lock
} from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';

interface FooterProps {
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
  onOpenEnquiry: (slug?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenPrivacy,
  onOpenTerms,
  onOpenEnquiry
}) => {
  const { courses, siteSettings } = useAcademy();

  return (
    <footer className="bg-[#0F172A] text-white border-t border-slate-800">


      {/* Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Col 1 & 2: Brand Info */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-[93px] h-[70px] bg-[#123B2A] flex items-center justify-center rounded-xl shadow-md">
                <img
                  src='../../assets/logo.png'
                  alt=''
                  className="w-[60px] h-[68px] object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div>
                <span className="font-bold text-xl tracking-tight text-white uppercase block leading-none">
                  SURABHI <span className="font-serif italic font-normal text-amber-400 capitalize">Academy</span>
                </span>
                <span className="text-[10px] tracking-widest text-slate-400 uppercase font-semibold">
                  Teaching Beyond Examination
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md">
              Nagpur’s premier coaching academy dedicated to deep conceptual clarity, disciplined study habits, small batch sizes, and proven board toppers across Classes 8 to 12.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2 pt-2">
              <a
                href={siteSettings.socials.facebook}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-300 flex items-center justify-center transition-all"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={siteSettings.socials.instagram}
                target="https://www.instagram.com/surabhiacademy154/?hl=en"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-300 flex items-center justify-center transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={siteSettings.socials.youtube}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-300 flex items-center justify-center transition-all"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href={siteSettings.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-300 flex items-center justify-center transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 3: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg uppercase tracking-widest text-amber-400 font-bold">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <Link to="/about" className="hover:text-amber-400 transition-colors">
                  About Our Academy
                </Link>
              </li>
              <li>
                <Link to="/results" className="hover:text-amber-400 transition-colors">
                  Toppers & Rankers Wall
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-amber-400 transition-colors">
                  Course
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-amber-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Campus Locations & Hours */}
          <div className="space-y-4">
            <h4 className="text-lg uppercase tracking-widest text-amber-400 font-bold">
              Campus & Timings
            </h4>
            <div className="space-y-3 text-sm text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span className="leading-snug text-slate-300">
                  {siteSettings.mainCampusAddress}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`tel:${siteSettings.primaryPhone.replace(/\s+/g, '')}`} className="hover:text-white">
                  {siteSettings.primaryPhone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`mailto:${siteSettings.email}`} className="hover:text-white">
                  {siteSettings.email}
                </a>
              </div>

            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-6 border-t border-slate-800 text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} {siteSettings.name}. All rights reserved.</p>

          <div className="flex flex-wrap items-center gap-4 text-slate-400">
            <button
              onClick={onOpenPrivacy}
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button
              onClick={onOpenTerms}
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              Terms of Admission
            </button>
            <span>•</span>
            <Link
              to="/admin/login"
              className="hover:text-white transition-colors inline-flex items-center gap-1 text-slate-500 hover:text-amber-400"
            >
              <Lock className="w-3 h-3" />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
