import type { CSSProperties, SyntheticEvent } from "react";
import Image, { ImageProps } from "next/image";

type RemoteImageProps = Omit<ImageProps, "src" | "loader"> & {
  src: string;
  fill?: boolean;
};

const ALLOWED_HOSTS = new Set(["picsum.photos", "apify.com"]);

function shouldUseNextImage(src: string): boolean {
  if (!src) return false;
  if (src.startsWith("/") || src.startsWith("data:") || src.startsWith("blob:")) {
    return true;
  }

  try {
    const url = new URL(src);
    return ALLOWED_HOSTS.has(url.hostname);
  } catch {
    return false;
  }
}

export function RemoteImage({
  src,
  alt,
  className,
  fill,
  width,
  height,
  style,
  sizes,
  priority,
  loading,
  onLoad,
  onError,
  ...rest
}: RemoteImageProps) {
  if (shouldUseNextImage(src)) {
    return (
      <Image
        src={src}
        alt={alt}
        className={className}
        fill={fill}
        width={width}
        height={height}
        style={style}
        sizes={sizes}
        priority={priority}
        loading={loading}
        onLoad={onLoad}
        onError={onError}
        {...rest}
      />
    );
  }

  const finalStyle: CSSProperties = {
    ...style,
  };

  if (fill) {
    finalStyle.position = "absolute";
    finalStyle.top = 0;
    finalStyle.left = 0;
    finalStyle.right = 0;
    finalStyle.bottom = 0;
    finalStyle.width = "100%";
    finalStyle.height = "100%";
  } else {
    if (typeof width === "number") {
      finalStyle.width = `${width}px`;
    }
    if (typeof height === "number") {
      finalStyle.height = `${height}px`;
    }
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element -- Needed as a fallback when remote hosts are not configured for next/image.
    <img
      src={src}
      alt={alt}
      className={className}
      style={finalStyle}
      loading={loading ?? "lazy"}
      onLoad={onLoad as unknown as (event: SyntheticEvent<HTMLImageElement>) => void}
      onError={onError as unknown as (event: SyntheticEvent<HTMLImageElement>) => void}
    />
  );
}


