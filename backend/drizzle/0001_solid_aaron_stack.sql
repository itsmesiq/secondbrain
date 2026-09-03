CREATE TABLE "embed_token" (
	"id" text PRIMARY KEY NOT NULL,
	"token_hash" text NOT NULL,
	"user_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "embed_token_token_hash_unique" UNIQUE("token_hash"),
	CONSTRAINT "embed_token_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
ALTER TABLE "embed_token" ADD CONSTRAINT "embed_token_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "embed_token_userId_idx" ON "embed_token" USING btree ("user_id");