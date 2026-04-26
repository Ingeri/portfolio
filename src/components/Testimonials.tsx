import prisma from "@/lib/prisma";
import { Quote } from "lucide-react";

// No need to manually define the interface if using prisma.testimonial
export default async function Testimonials() {
  // Fetching directly from the database
  const testimonials = await prisma.testimonial.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  if (testimonials.length === 0) {
    return null; // Or a fallback "No testimonials yet" message
  }

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 transition-colors duration-300">
            Client Testimonials
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto transition-colors duration-300">
            What people say about working with me
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="rounded-2xl border border-slate-200 bg-white p-8 transition-all duration-300 hover:scale-[1.02] hover:border-slate-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
            >
              <Quote className="w-8 h-8 text-blue-500 mb-4" />
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-6 transition-colors duration-300">
                {testimonial.content}
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white transition-colors duration-300">{testimonial.name}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-500 transition-colors duration-300">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}