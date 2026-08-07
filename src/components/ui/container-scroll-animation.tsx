"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue, type UseScrollOptions } from "framer-motion";

const STICKY_TOP_PX = { base: 112, md: 136 }; // matches top-28 / md:top-34

/**
 * Progress driven by a sticky element's actual pin/unpin window, measured
 * from real DOM geometry rather than assumed from the tall container's
 * total height. Framer's stock useScroll offsets tie progress either to
 * (elementHeight - viewportHeight) or elementHeight outright — neither
 * matches where a `position: sticky` child actually starts/stops pinning,
 * so a height-only mapping runs stages past the point the card has already
 * scrolled out of view. This measures containerTop and the sticky wrapper's
 * own rendered height to compute the exact pixel window instead.
 */
function useStickyProgress(
  containerRef: React.RefObject<HTMLDivElement>,
  stickyRef: React.RefObject<HTMLDivElement>
) {
  const { scrollY } = useScroll();
  const [window_, setWindow] = React.useState({ start: 0, end: 1 });

  React.useEffect(() => {
    const measure = () => {
      const container = containerRef.current;
      const sticky = stickyRef.current;
      if (!container || !sticky) return;
      const topOffset = window.innerWidth >= 768 ? STICKY_TOP_PX.md : STICKY_TOP_PX.base;
      const containerTop = container.getBoundingClientRect().top + window.scrollY;
      const stickyHeight = sticky.getBoundingClientRect().height;
      const start = containerTop - topOffset;
      const end = containerTop + container.offsetHeight - stickyHeight - topOffset;
      setWindow({ start, end: Math.max(end, start + 1) });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [containerRef, stickyRef]);

  return useTransform(scrollY, [window_.start, window_.end], [0, 1]);
}

export const ContainerScroll = ({
  titleComponent,
  children,
  offset,
  sticky = false,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode | ((progress: MotionValue<number>) => React.ReactNode);
  /**
   * Framer Motion scroll offset pair, used only when `sticky` is false.
   * Defaults to Framer's own default (["start start", "end end"]), which
   * ties progress to (elementHeight - viewportHeight) — fine for a single
   * continuous reveal that scrolls past in normal flow.
   */
  offset?: UseScrollOptions["offset"];
  /**
   * By default the Header/Card scroll past the viewport in normal flow
   * while rotating — fine for a single brief "wow" reveal. When children
   * cycle through multiple stages (e.g. driven by the progress render-prop),
   * the card needs to stay pinned on screen while progress advances, or
   * whichever stage is "active" ends up scrolled out of view already. Set
   * sticky to pin the Header/Card near the top of the viewport and drive
   * progress from that pin window's actual measured geometry instead.
   */
  sticky?: boolean;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset,
  });
  const stickyProgress = useStickyProgress(containerRef, stickyRef);
  const progress = sticky ? stickyProgress : scrollYProgress;

  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.7, 0.9] : [1.05, 1];
  };

  const rotate = useTransform(progress, [0, 1], [20, 0]);
  const scale = useTransform(progress, [0, 1], scaleDimensions());
  const translate = useTransform(progress, [0, 1], [0, -100]);
  // Sticky headings stay pinned near the nav — a full -100px drift would
  // carry them under the fixed header by the later stages, so keep their
  // parallax much smaller than the card's.
  const headerTranslate = useTransform(progress, [0, 1], [0, sticky ? -16 : -100]);

  return (
    <div
      className={
        sticky
          ? "h-[110rem] md:h-[150rem] relative"
          : "h-[60rem] md:h-[80rem] flex items-center justify-center relative p-2 md:p-20"
      }
      ref={containerRef}
    >
      <div
        ref={stickyRef}
        className={
          sticky
            ? "sticky top-28 md:top-[8.5rem] w-full relative"
            : "py-10 md:py-40 w-full relative"
        }
        style={{
          perspective: "1000px",
        }}
      >
        <Header translate={headerTranslate} titleComponent={titleComponent} />
        <Card rotate={rotate} translate={translate} scale={scale} sticky={sticky}>
          {typeof children === "function" ? children(progress) : children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({ translate, titleComponent }: any) => {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="div max-w-5xl mx-auto text-center"
    >
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({
  rotate,
  scale,
  children,
  sticky,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translate: MotionValue<number>;
  children: React.ReactNode;
  sticky?: boolean;
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003, 0 0 60px -15px rgba(237,122,54,0.2)",
      }}
      className={`max-w-5xl mx-auto h-[30rem] md:h-[40rem] w-full border-4 border-border-strong p-2 md:p-6 bg-card rounded-[30px] shadow-2xl ${
        sticky ? "mt-8 md:mt-10" : "-mt-12"
      }`}
    >
      <div className="h-full w-full overflow-hidden rounded-2xl bg-background md:rounded-2xl md:p-4">
        {children}
      </div>
    </motion.div>
  );
};
