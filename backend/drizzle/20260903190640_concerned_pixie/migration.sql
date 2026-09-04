ALTER TABLE "embed_token" DROP CONSTRAINT "embed_token_user_id_unique";--> statement-breakpoint
ALTER TABLE "embed_token" ADD COLUMN "widget_id" text NOT NULL;