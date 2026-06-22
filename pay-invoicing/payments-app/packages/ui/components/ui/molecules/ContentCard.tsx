import { Card, CardContent, Typography, CardMedia } from "@mui/material";
import { motion } from "framer-motion";

interface ContentCardProps {
  image: string;
  title: string;
  description: string;
}

export function ContentCard({ image, title, description }: ContentCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: 0.1,
        ease: "easeOut",
      }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      style={{ display: "flex" }}
    >
      <Card
        sx={{
          width: {
            xs: "280px",
            md: "370px",
          },
          minWidth: "280px",
          maxWidth: "370px",
          boxShadow: 0,
          outline: "1px solid #F5F5F5",
          borderRadius: "12px",
          "&:hover": {
            cursor: "pointer",
            backgroundColor: "#F5F5F5",
            boxShadow: "0px 3px 1px 0px rgba(0, 0, 0, 0.1)",
          },
        }}
      >
        <CardMedia
          component="img"
          sx={{
            height: {
              sm: "140px",
              md: "208px",
              borderRadius: "0px",
            },
          }}
          image={image}
          alt={title}
        />
        <CardContent sx={{ p: 2, height: "152px" }}>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: "bold",
              fontSize: "1rem",
              mb: 1,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              color: "#283e48",
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontWeight: "normal",
              fontSize: "0.875rem",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              color: "text.secondary",
            }}
          >
            {description}
          </Typography>
        </CardContent>
      </Card>
    </motion.div>
  );
}
