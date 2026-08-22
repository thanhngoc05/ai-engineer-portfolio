"use client";

import dynamic from "next/dynamic";
import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";

import { useMediaQuery } from "@/hooks/use-media-query";

const PandaPetScene = dynamic(() => import("@/components/three/PandaPetScene"), {
  ssr: false,
  loading: () => <span className="panda-pet__loading" aria-hidden="true" />,
});

type DragState = {
  moved: boolean;
  pointerId: number;
  startLeft: number;
  startTop: number;
  startX: number;
  startY: number;
};

type PetPosition = {
  left: number;
  top: number;
};

function clampPosition(position: PetPosition, element: HTMLElement | null) {
  if (typeof window === "undefined") return position;

  const viewportWidth = document.documentElement.clientWidth || window.innerWidth;
  const mobile = viewportWidth <= 767;
  const margin = mobile ? 6 : 14;
  const minimumTop = mobile ? 170 : 88;
  const petWidth = element?.offsetWidth ?? (mobile ? 96 : 190);
  const petHeight = element?.offsetHeight ?? (mobile ? 132 : 220);
  const maximumLeft = Math.max(margin, viewportWidth - petWidth - margin);
  const maximumTop = Math.max(minimumTop, window.innerHeight - petHeight - margin);

  return {
    left: Math.min(maximumLeft, Math.max(margin, position.left)),
    top: Math.min(maximumTop, Math.max(minimumTop, position.top)),
  };
}

export function PandaPetCompanion() {
  const containerRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<DragState | null>(null);
  const suppressClickRef = useRef(false);
  const mobile = useMediaQuery("(max-width: 767px)");
  const [dragging, setDragging] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [reaction, setReaction] = useState(0);
  const [position, setPosition] = useState<PetPosition | null>(null);

  useEffect(() => {
    const updatePosition = () => {
      setPosition((current) => {
        const element = containerRef.current;
        const viewportWidth = document.documentElement.clientWidth || window.innerWidth;
        const mobileViewport = viewportWidth <= 767;
        const initial = {
          left:
            viewportWidth -
            (element?.offsetWidth ?? (mobileViewport ? 96 : 190)) -
            (mobileViewport ? 6 : 20),
          top: mobileViewport
            ? Math.max(170, window.innerHeight * 0.24)
            : window.innerHeight * 0.28,
        };

        return clampPosition(current ?? initial, element);
      });
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    return () => window.removeEventListener("resize", updatePosition);
  }, []);

  function handlePointerDown(event: ReactPointerEvent<HTMLButtonElement>) {
    if (event.pointerType === "mouse" && event.button !== 0) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = {
      moved: false,
      pointerId: event.pointerId,
      startLeft: bounds.left,
      startTop: bounds.top,
      startX: event.clientX,
      startY: event.clientY,
    };
    setDragging(true);
  }

  function handlePointerMove(event: ReactPointerEvent<HTMLButtonElement>) {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    const deltaX = event.clientX - drag.startX;
    const deltaY = event.clientY - drag.startY;
    if (Math.hypot(deltaX, deltaY) > 4) drag.moved = true;
    setPosition(
      clampPosition(
        {
          left: drag.startLeft + deltaX,
          top: drag.startTop + deltaY,
        },
        containerRef.current,
      ),
    );
  }

  function finishDrag(event: ReactPointerEvent<HTMLButtonElement>) {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    suppressClickRef.current = drag.moved;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    dragRef.current = null;
    setDragging(false);
  }

  function cancelDrag(event: ReactPointerEvent<HTMLButtonElement>) {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    suppressClickRef.current = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    dragRef.current = null;
    setDragging(false);
  }

  function handleClick() {
    if (suppressClickRef.current) {
      suppressClickRef.current = false;
      return;
    }

    setReaction((current) => current + 1);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (!["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) {
      return;
    }

    event.preventDefault();
    const distance = event.shiftKey ? 64 : 28;
    const bounds = containerRef.current?.getBoundingClientRect();
    const current = position ?? {
      left: bounds?.left ?? 0,
      top: bounds?.top ?? 0,
    };
    let movement = { left: 0, top: 0 };

    if (event.key === "ArrowUp") movement = { left: 0, top: -distance };
    if (event.key === "ArrowDown") movement = { left: 0, top: distance };
    if (event.key === "ArrowLeft") movement = { left: -distance, top: 0 };
    if (event.key === "ArrowRight") movement = { left: distance, top: 0 };

    setPosition(
      clampPosition(
        {
          left: current.left + movement.left,
          top: current.top + movement.top,
        },
        containerRef.current,
      ),
    );
  }

  return (
    <div
      ref={containerRef}
      className={`panda-pet${dragging ? " panda-pet--dragging" : ""}`}
      style={
        position === null
          ? undefined
          : { left: position.left, right: "auto", top: position.top }
      }
    >
      <div className="panda-pet__canvas" aria-hidden="true">
        <PandaPetScene
          dragging={dragging}
          hovered={hovered}
          mobile={mobile}
          reaction={reaction}
        />
      </div>
      <button
        type="button"
        className="panda-pet__control"
        aria-label="Interactive 3D panda pet. Drag in any direction or use the arrow keys to move it."
        title="Drag in any direction · Click to interact"
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onPointerCancel={cancelDrag}
        onPointerDown={handlePointerDown}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        onPointerMove={handlePointerMove}
        onPointerUp={finishDrag}
      >
        <span className="panda-pet__label" aria-hidden="true">
          PET / DRAG ↔↕
        </span>
      </button>
    </div>
  );
}
