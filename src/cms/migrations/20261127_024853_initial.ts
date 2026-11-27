import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_products_features_icon" AS ENUM('order', 'chain', 'box', 'shield', 'factory', 'wallet', 'invoice', 'cloud', 'offline', 'spark', 'chart', 'users', 'lock', 'clock', 'target', 'truck', 'tag', 'swatch', 'layers', 'mobile', 'bell', 'store');
  CREATE TYPE "public"."enum_products_audience" AS ENUM('manufacturers', 'buyingHouses');
  CREATE TYPE "public"."enum_products_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__products_v_version_features_icon" AS ENUM('order', 'chain', 'box', 'shield', 'factory', 'wallet', 'invoice', 'cloud', 'offline', 'spark', 'chart', 'users', 'lock', 'clock', 'target', 'truck', 'tag', 'swatch', 'layers', 'mobile', 'bell', 'store');
  CREATE TYPE "public"."enum__products_v_version_audience" AS ENUM('manufacturers', 'buyingHouses');
  CREATE TYPE "public"."enum__products_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_solutions_capabilities_icon" AS ENUM('order', 'chain', 'box', 'shield', 'factory', 'wallet', 'invoice', 'cloud', 'offline', 'spark', 'chart', 'users', 'lock', 'clock', 'target', 'truck', 'tag', 'swatch', 'layers', 'mobile', 'bell', 'store');
  CREATE TYPE "public"."enum_solutions_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__solutions_v_version_capabilities_icon" AS ENUM('order', 'chain', 'box', 'shield', 'factory', 'wallet', 'invoice', 'cloud', 'offline', 'spark', 'chart', 'users', 'lock', 'clock', 'target', 'truck', 'tag', 'swatch', 'layers', 'mobile', 'bell', 'store');
  CREATE TYPE "public"."enum__solutions_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_industries_pains_icon" AS ENUM('order', 'chain', 'box', 'shield', 'factory', 'wallet', 'invoice', 'cloud', 'offline', 'spark', 'chart', 'users', 'lock', 'clock', 'target', 'truck', 'tag', 'swatch', 'layers', 'mobile', 'bell', 'store');
  CREATE TYPE "public"."enum_industries_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__industries_v_version_pains_icon" AS ENUM('order', 'chain', 'box', 'shield', 'factory', 'wallet', 'invoice', 'cloud', 'offline', 'spark', 'chart', 'users', 'lock', 'clock', 'target', 'truck', 'tag', 'swatch', 'layers', 'mobile', 'bell', 'store');
  CREATE TYPE "public"."enum__industries_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_countries_points_icon" AS ENUM('order', 'chain', 'box', 'shield', 'factory', 'wallet', 'invoice', 'cloud', 'offline', 'spark', 'chart', 'users', 'lock', 'clock', 'target', 'truck', 'tag', 'swatch', 'layers', 'mobile', 'bell', 'store');
  CREATE TYPE "public"."enum_countries_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__countries_v_version_points_icon" AS ENUM('order', 'chain', 'box', 'shield', 'factory', 'wallet', 'invoice', 'cloud', 'offline', 'spark', 'chart', 'users', 'lock', 'clock', 'target', 'truck', 'tag', 'swatch', 'layers', 'mobile', 'bell', 'store');
  CREATE TYPE "public"."enum__countries_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_cities_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__cities_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_case_studies_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__case_studies_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_clients_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__clients_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_testimonials_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__testimonials_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_posts_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__posts_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_glossary_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__glossary_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_jobs_type" AS ENUM('FULL_TIME', 'PART_TIME', 'INTERN', 'CONTRACTOR');
  CREATE TYPE "public"."enum_jobs_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__jobs_v_version_type" AS ENUM('FULL_TIME', 'PART_TIME', 'INTERN', 'CONTRACTOR');
  CREATE TYPE "public"."enum__jobs_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_legal_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__legal_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_leads_type" AS ENUM('demo', 'contact', 'partner', 'ai', 'product', 'brochure');
  CREATE TYPE "public"."enum_leads_status" AS ENUM('new', 'contacted', 'demo', 'proposal', 'won', 'lost', 'spam');
  CREATE TYPE "public"."enum_bookings_status" AS ENUM('booked', 'rescheduled', 'cancelled', 'completed', 'noshow');
  CREATE TYPE "public"."enum_job_applications_status" AS ENUM('new', 'shortlisted', 'interview', 'offer', 'rejected');
  CREATE TYPE "public"."enum_users_modules" AS ENUM('website', 'products', 'locations', 'blog', 'customers', 'glossary', 'leads', 'careers', 'settings');
  CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'editor');
  CREATE TYPE "public"."enum_home_page_problem_stages_icon" AS ENUM('order', 'chain', 'box', 'shield', 'factory', 'wallet', 'invoice', 'cloud', 'offline', 'spark', 'chart', 'users', 'lock', 'clock', 'target', 'truck', 'tag', 'swatch', 'layers', 'mobile', 'bell', 'store');
  CREATE TYPE "public"."enum_home_page_ai_points_icon" AS ENUM('order', 'chain', 'box', 'shield', 'factory', 'wallet', 'invoice', 'cloud', 'offline', 'spark', 'chart', 'users', 'lock', 'clock', 'target', 'truck', 'tag', 'swatch', 'layers', 'mobile', 'bell', 'store');
  CREATE TYPE "public"."enum_home_page_why_icon" AS ENUM('order', 'chain', 'box', 'shield', 'factory', 'wallet', 'invoice', 'cloud', 'offline', 'spark', 'chart', 'users', 'lock', 'clock', 'target', 'truck', 'tag', 'swatch', 'layers', 'mobile', 'bell', 'store');
  CREATE TYPE "public"."enum_home_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__home_page_v_version_problem_stages_icon" AS ENUM('order', 'chain', 'box', 'shield', 'factory', 'wallet', 'invoice', 'cloud', 'offline', 'spark', 'chart', 'users', 'lock', 'clock', 'target', 'truck', 'tag', 'swatch', 'layers', 'mobile', 'bell', 'store');
  CREATE TYPE "public"."enum__home_page_v_version_ai_points_icon" AS ENUM('order', 'chain', 'box', 'shield', 'factory', 'wallet', 'invoice', 'cloud', 'offline', 'spark', 'chart', 'users', 'lock', 'clock', 'target', 'truck', 'tag', 'swatch', 'layers', 'mobile', 'bell', 'store');
  CREATE TYPE "public"."enum__home_page_v_version_why_icon" AS ENUM('order', 'chain', 'box', 'shield', 'factory', 'wallet', 'invoice', 'cloud', 'offline', 'spark', 'chart', 'users', 'lock', 'clock', 'target', 'truck', 'tag', 'swatch', 'layers', 'mobile', 'bell', 'store');
  CREATE TYPE "public"."enum__home_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_about_page_practices_icon" AS ENUM('order', 'chain', 'box', 'shield', 'factory', 'wallet', 'invoice', 'cloud', 'offline', 'spark', 'chart', 'users', 'lock', 'clock', 'target', 'truck', 'tag', 'swatch', 'layers', 'mobile', 'bell', 'store');
  CREATE TYPE "public"."enum_about_page_pillars_icon" AS ENUM('order', 'chain', 'box', 'shield', 'factory', 'wallet', 'invoice', 'cloud', 'offline', 'spark', 'chart', 'users', 'lock', 'clock', 'target', 'truck', 'tag', 'swatch', 'layers', 'mobile', 'bell', 'store');
  CREATE TYPE "public"."enum_about_page_engagement_icon" AS ENUM('order', 'chain', 'box', 'shield', 'factory', 'wallet', 'invoice', 'cloud', 'offline', 'spark', 'chart', 'users', 'lock', 'clock', 'target', 'truck', 'tag', 'swatch', 'layers', 'mobile', 'bell', 'store');
  CREATE TYPE "public"."enum_about_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__about_page_v_version_practices_icon" AS ENUM('order', 'chain', 'box', 'shield', 'factory', 'wallet', 'invoice', 'cloud', 'offline', 'spark', 'chart', 'users', 'lock', 'clock', 'target', 'truck', 'tag', 'swatch', 'layers', 'mobile', 'bell', 'store');
  CREATE TYPE "public"."enum__about_page_v_version_pillars_icon" AS ENUM('order', 'chain', 'box', 'shield', 'factory', 'wallet', 'invoice', 'cloud', 'offline', 'spark', 'chart', 'users', 'lock', 'clock', 'target', 'truck', 'tag', 'swatch', 'layers', 'mobile', 'bell', 'store');
  CREATE TYPE "public"."enum__about_page_v_version_engagement_icon" AS ENUM('order', 'chain', 'box', 'shield', 'factory', 'wallet', 'invoice', 'cloud', 'offline', 'spark', 'chart', 'users', 'lock', 'clock', 'target', 'truck', 'tag', 'swatch', 'layers', 'mobile', 'bell', 'store');
  CREATE TYPE "public"."enum__about_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_ai_page_benefits_icon" AS ENUM('order', 'chain', 'box', 'shield', 'factory', 'wallet', 'invoice', 'cloud', 'offline', 'spark', 'chart', 'users', 'lock', 'clock', 'target', 'truck', 'tag', 'swatch', 'layers', 'mobile', 'bell', 'store');
  CREATE TYPE "public"."enum_ai_page_audiences_icon" AS ENUM('order', 'chain', 'box', 'shield', 'factory', 'wallet', 'invoice', 'cloud', 'offline', 'spark', 'chart', 'users', 'lock', 'clock', 'target', 'truck', 'tag', 'swatch', 'layers', 'mobile', 'bell', 'store');
  CREATE TYPE "public"."enum_ai_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__ai_page_v_version_benefits_icon" AS ENUM('order', 'chain', 'box', 'shield', 'factory', 'wallet', 'invoice', 'cloud', 'offline', 'spark', 'chart', 'users', 'lock', 'clock', 'target', 'truck', 'tag', 'swatch', 'layers', 'mobile', 'bell', 'store');
  CREATE TYPE "public"."enum__ai_page_v_version_audiences_icon" AS ENUM('order', 'chain', 'box', 'shield', 'factory', 'wallet', 'invoice', 'cloud', 'offline', 'spark', 'chart', 'users', 'lock', 'clock', 'target', 'truck', 'tag', 'swatch', 'layers', 'mobile', 'bell', 'store');
  CREATE TYPE "public"."enum__ai_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_careers_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__careers_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_partner_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__partner_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_contact_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__contact_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_demo_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__demo_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_site_settings_social_label" AS ENUM('LinkedIn', 'YouTube', 'Instagram', 'Facebook', 'X');
  CREATE TABLE "products_hero_flow" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"highlight" boolean,
  	"text" varchar
  );
  
  CREATE TABLE "products_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_products_features_icon",
  	"title" varchar,
  	"text" varchar
  );
  
  CREATE TABLE "products_roles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"points" varchar
  );
  
  CREATE TABLE "products_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar
  );
  
  CREATE TABLE "products_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"q" varchar,
  	"a" varchar
  );
  
  CREATE TABLE "products_problems" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"without" varchar,
  	"with" varchar,
  	"with_title" varchar
  );
  
  CREATE TABLE "products_quick_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar
  );
  
  CREATE TABLE "products_modes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"points" varchar
  );
  
  CREATE TABLE "products_reports_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "products_reports" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"points" varchar,
  	"image_id" integer,
  	"image_path" varchar
  );
  
  CREATE TABLE "products_compare_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"them" varchar,
  	"us" varchar
  );
  
  CREATE TABLE "products" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"short_name" varchar,
  	"brand" varchar,
  	"code" varchar,
  	"stage" varchar,
  	"audience" "enum_products_audience",
  	"audience_label" varchar,
  	"headline" varchar,
  	"tagline" varchar,
  	"hero_title" varchar,
  	"hero_text" varchar,
  	"hero_link_label" varchar,
  	"hero_link_href" varchar,
  	"answer" varchar,
  	"intro" varchar,
  	"image_id" integer,
  	"image_path" varchar,
  	"highlights" varchar,
  	"features_title" varchar,
  	"features_lead" varchar,
  	"roles_title" varchar,
  	"benefits_title" varchar,
  	"benefits_lead" varchar,
  	"steps_title" varchar,
  	"steps_lead" varchar,
  	"steps_image_id" integer,
  	"steps_image_path" varchar,
  	"steps_image_alt" varchar,
  	"steps" varchar,
  	"tags" varchar,
  	"problems_title" varchar,
  	"problems_lead" varchar,
  	"quick_steps_title" varchar,
  	"quick_steps_lead" varchar,
  	"modes_title" varchar,
  	"modes_lead" varchar,
  	"modes_flow" varchar,
  	"reports_title" varchar,
  	"reports_lead" varchar,
  	"reports_note" varchar,
  	"compare_title" varchar,
  	"compare_them" varchar,
  	"compare_lead" varchar,
  	"cta_title" varchar,
  	"cta_text" varchar,
  	"fit_manufacturers" boolean,
  	"fit_buying_houses" boolean,
  	"fit_exporters" boolean,
  	"fit_brands" boolean,
  	"keywords" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_image_id" integer,
  	"seo_noindex" boolean DEFAULT false,
  	"slug" varchar,
  	"order" numeric DEFAULT 100,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_products_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "products_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"products_id" integer
  );
  
  CREATE TABLE "_products_v_version_hero_flow" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"highlight" boolean,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_products_v_version_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__products_v_version_features_icon",
  	"title" varchar,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_products_v_version_roles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"points" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_products_v_version_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_products_v_version_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"q" varchar,
  	"a" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_products_v_version_problems" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"without" varchar,
  	"with" varchar,
  	"with_title" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_products_v_version_quick_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_products_v_version_modes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"points" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_products_v_version_reports_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_products_v_version_reports" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"points" varchar,
  	"image_id" integer,
  	"image_path" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_products_v_version_compare_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"them" varchar,
  	"us" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_products_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar,
  	"version_short_name" varchar,
  	"version_brand" varchar,
  	"version_code" varchar,
  	"version_stage" varchar,
  	"version_audience" "enum__products_v_version_audience",
  	"version_audience_label" varchar,
  	"version_headline" varchar,
  	"version_tagline" varchar,
  	"version_hero_title" varchar,
  	"version_hero_text" varchar,
  	"version_hero_link_label" varchar,
  	"version_hero_link_href" varchar,
  	"version_answer" varchar,
  	"version_intro" varchar,
  	"version_image_id" integer,
  	"version_image_path" varchar,
  	"version_highlights" varchar,
  	"version_features_title" varchar,
  	"version_features_lead" varchar,
  	"version_roles_title" varchar,
  	"version_benefits_title" varchar,
  	"version_benefits_lead" varchar,
  	"version_steps_title" varchar,
  	"version_steps_lead" varchar,
  	"version_steps_image_id" integer,
  	"version_steps_image_path" varchar,
  	"version_steps_image_alt" varchar,
  	"version_steps" varchar,
  	"version_tags" varchar,
  	"version_problems_title" varchar,
  	"version_problems_lead" varchar,
  	"version_quick_steps_title" varchar,
  	"version_quick_steps_lead" varchar,
  	"version_modes_title" varchar,
  	"version_modes_lead" varchar,
  	"version_modes_flow" varchar,
  	"version_reports_title" varchar,
  	"version_reports_lead" varchar,
  	"version_reports_note" varchar,
  	"version_compare_title" varchar,
  	"version_compare_them" varchar,
  	"version_compare_lead" varchar,
  	"version_cta_title" varchar,
  	"version_cta_text" varchar,
  	"version_fit_manufacturers" boolean,
  	"version_fit_buying_houses" boolean,
  	"version_fit_exporters" boolean,
  	"version_fit_brands" boolean,
  	"version_keywords" varchar,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_seo_image_id" integer,
  	"version_seo_noindex" boolean DEFAULT false,
  	"version_slug" varchar,
  	"version_order" numeric DEFAULT 100,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__products_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_products_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"products_id" integer
  );
  
  CREATE TABLE "solutions_capabilities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_solutions_capabilities_icon",
  	"title" varchar,
  	"text" varchar
  );
  
  CREATE TABLE "solutions_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"q" varchar,
  	"a" varchar
  );
  
  CREATE TABLE "solutions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"h1" varchar,
  	"answer" varchar,
  	"intro" varchar,
  	"problems" varchar,
  	"steps" varchar,
  	"keywords" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_image_id" integer,
  	"seo_noindex" boolean DEFAULT false,
  	"slug" varchar,
  	"order" numeric DEFAULT 100,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_solutions_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "solutions_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"products_id" integer
  );
  
  CREATE TABLE "_solutions_v_version_capabilities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__solutions_v_version_capabilities_icon",
  	"title" varchar,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_solutions_v_version_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"q" varchar,
  	"a" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_solutions_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar,
  	"version_h1" varchar,
  	"version_answer" varchar,
  	"version_intro" varchar,
  	"version_problems" varchar,
  	"version_steps" varchar,
  	"version_keywords" varchar,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_seo_image_id" integer,
  	"version_seo_noindex" boolean DEFAULT false,
  	"version_slug" varchar,
  	"version_order" numeric DEFAULT 100,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__solutions_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_solutions_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"products_id" integer
  );
  
  CREATE TABLE "industries_pains" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_industries_pains_icon",
  	"title" varchar,
  	"text" varchar
  );
  
  CREATE TABLE "industries_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"q" varchar,
  	"a" varchar
  );
  
  CREATE TABLE "industries" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"h1" varchar,
  	"answer" varchar,
  	"intro" varchar,
  	"keywords" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_image_id" integer,
  	"seo_noindex" boolean DEFAULT false,
  	"slug" varchar,
  	"order" numeric DEFAULT 100,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_industries_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "industries_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"products_id" integer,
  	"solutions_id" integer
  );
  
  CREATE TABLE "_industries_v_version_pains" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__industries_v_version_pains_icon",
  	"title" varchar,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_industries_v_version_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"q" varchar,
  	"a" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_industries_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar,
  	"version_h1" varchar,
  	"version_answer" varchar,
  	"version_intro" varchar,
  	"version_keywords" varchar,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_seo_image_id" integer,
  	"version_seo_noindex" boolean DEFAULT false,
  	"version_slug" varchar,
  	"version_order" numeric DEFAULT 100,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__industries_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_industries_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"products_id" integer,
  	"solutions_id" integer
  );
  
  CREATE TABLE "countries_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_countries_points_icon",
  	"title" varchar,
  	"text" varchar
  );
  
  CREATE TABLE "countries_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"q" varchar,
  	"a" varchar
  );
  
  CREATE TABLE "countries" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"short" varchar,
  	"h1" varchar,
  	"answer" varchar,
  	"intro" varchar,
  	"industry" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_image_id" integer,
  	"seo_noindex" boolean DEFAULT false,
  	"slug" varchar,
  	"order" numeric DEFAULT 100,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_countries_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "countries_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"products_id" integer,
  	"case_studies_id" integer
  );
  
  CREATE TABLE "_countries_v_version_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__countries_v_version_points_icon",
  	"title" varchar,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_countries_v_version_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"q" varchar,
  	"a" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_countries_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar,
  	"version_short" varchar,
  	"version_h1" varchar,
  	"version_answer" varchar,
  	"version_intro" varchar,
  	"version_industry" varchar,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_seo_image_id" integer,
  	"version_seo_noindex" boolean DEFAULT false,
  	"version_slug" varchar,
  	"version_order" numeric DEFAULT 100,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__countries_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_countries_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"products_id" integer,
  	"case_studies_id" integer
  );
  
  CREATE TABLE "cities_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"q" varchar,
  	"a" varchar
  );
  
  CREATE TABLE "cities" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"country_id" integer,
  	"region" varchar,
  	"h1" varchar,
  	"answer" varchar,
  	"cluster" varchar,
  	"makes" varchar,
  	"challenges" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_image_id" integer,
  	"seo_noindex" boolean DEFAULT false,
  	"slug" varchar,
  	"order" numeric DEFAULT 100,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_cities_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "cities_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"products_id" integer
  );
  
  CREATE TABLE "_cities_v_version_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"q" varchar,
  	"a" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_cities_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar,
  	"version_country_id" integer,
  	"version_region" varchar,
  	"version_h1" varchar,
  	"version_answer" varchar,
  	"version_cluster" varchar,
  	"version_makes" varchar,
  	"version_challenges" varchar,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_seo_image_id" integer,
  	"version_seo_noindex" boolean DEFAULT false,
  	"version_slug" varchar,
  	"version_order" numeric DEFAULT 100,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__cities_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_cities_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"products_id" integer
  );
  
  CREATE TABLE "case_studies_results" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "case_studies" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"client" varchar,
  	"location" varchar,
  	"date" timestamp(3) with time zone,
  	"title" varchar,
  	"product_id" integer,
  	"product_label" varchar,
  	"category" varchar,
  	"image_id" integer,
  	"image_path" varchar,
  	"about" varchar,
  	"challenges" varchar,
  	"impact" varchar,
  	"featured" boolean,
  	"legacy_id" numeric,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_image_id" integer,
  	"seo_noindex" boolean DEFAULT false,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_case_studies_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_case_studies_v_version_results" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_case_studies_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_client" varchar,
  	"version_location" varchar,
  	"version_date" timestamp(3) with time zone,
  	"version_title" varchar,
  	"version_product_id" integer,
  	"version_product_label" varchar,
  	"version_category" varchar,
  	"version_image_id" integer,
  	"version_image_path" varchar,
  	"version_about" varchar,
  	"version_challenges" varchar,
  	"version_impact" varchar,
  	"version_featured" boolean,
  	"version_legacy_id" numeric,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_seo_image_id" integer,
  	"version_seo_noindex" boolean DEFAULT false,
  	"version_slug" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__case_studies_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "clients" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"logo_id" integer,
  	"logo_path" varchar,
  	"case_study_id" integer,
  	"show_on_home" boolean DEFAULT true,
  	"order" numeric DEFAULT 100,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_clients_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_clients_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar,
  	"version_logo_id" integer,
  	"version_logo_path" varchar,
  	"version_case_study_id" integer,
  	"version_show_on_home" boolean DEFAULT true,
  	"version_order" numeric DEFAULT 100,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__clients_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "testimonials" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"name" varchar,
  	"role" varchar,
  	"company" varchar,
  	"photo_id" integer,
  	"show_on_home" boolean DEFAULT true,
  	"order" numeric DEFAULT 100,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_testimonials_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "testimonials_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"products_id" integer
  );
  
  CREATE TABLE "_testimonials_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_quote" varchar,
  	"version_name" varchar,
  	"version_role" varchar,
  	"version_company" varchar,
  	"version_photo_id" integer,
  	"version_show_on_home" boolean DEFAULT true,
  	"version_order" numeric DEFAULT 100,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__testimonials_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_testimonials_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"products_id" integer
  );
  
  CREATE TABLE "posts_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"q" varchar,
  	"a" varchar
  );
  
  CREATE TABLE "posts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"excerpt" varchar,
  	"image_id" integer,
  	"body" jsonb,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_image_id" integer,
  	"seo_noindex" boolean DEFAULT false,
  	"slug" varchar,
  	"category_id" integer,
  	"date" timestamp(3) with time zone,
  	"updated" timestamp(3) with time zone,
  	"author" varchar DEFAULT 'ASK Technology',
  	"legacy_id" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_posts_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_posts_v_version_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"q" varchar,
  	"a" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_excerpt" varchar,
  	"version_image_id" integer,
  	"version_body" jsonb,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_seo_image_id" integer,
  	"version_seo_noindex" boolean DEFAULT false,
  	"version_slug" varchar,
  	"version_category_id" integer,
  	"version_date" timestamp(3) with time zone,
  	"version_updated" timestamp(3) with time zone,
  	"version_author" varchar DEFAULT 'ASK Technology',
  	"version_legacy_id" numeric,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__posts_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"description" varchar,
  	"slug" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "glossary" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"term" varchar,
  	"aka" varchar,
  	"short" varchar,
  	"body" varchar,
  	"product_id" integer,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_image_id" integer,
  	"seo_noindex" boolean DEFAULT false,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_glossary_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "glossary_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"glossary_id" integer
  );
  
  CREATE TABLE "_glossary_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_term" varchar,
  	"version_aka" varchar,
  	"version_short" varchar,
  	"version_body" varchar,
  	"version_product_id" integer,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_seo_image_id" integer,
  	"version_seo_noindex" boolean DEFAULT false,
  	"version_slug" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__glossary_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_glossary_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"glossary_id" integer
  );
  
  CREATE TABLE "jobs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"department" varchar,
  	"location" varchar DEFAULT 'Chennai',
  	"type" "enum_jobs_type" DEFAULT 'FULL_TIME',
  	"experience" varchar,
  	"summary" varchar,
  	"responsibilities" varchar,
  	"requirements" varchar,
  	"date_posted" timestamp(3) with time zone,
  	"valid_through" timestamp(3) with time zone,
  	"open" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_jobs_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_jobs_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_department" varchar,
  	"version_location" varchar DEFAULT 'Chennai',
  	"version_type" "enum__jobs_v_version_type" DEFAULT 'FULL_TIME',
  	"version_experience" varchar,
  	"version_summary" varchar,
  	"version_responsibilities" varchar,
  	"version_requirements" varchar,
  	"version_date_posted" timestamp(3) with time zone,
  	"version_valid_through" timestamp(3) with time zone,
  	"version_open" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__jobs_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "legal" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"summary" varchar,
  	"updated" timestamp(3) with time zone,
  	"body" jsonb,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_image_id" integer,
  	"seo_noindex" boolean DEFAULT false,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_legal_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_legal_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_summary" varchar,
  	"version_updated" timestamp(3) with time zone,
  	"version_body" jsonb,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_seo_image_id" integer,
  	"version_seo_noindex" boolean DEFAULT false,
  	"version_slug" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__legal_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "leads" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"type" "enum_leads_type" NOT NULL,
  	"status" "enum_leads_status" DEFAULT 'new',
  	"name" varchar NOT NULL,
  	"company" varchar,
  	"email" varchar NOT NULL,
  	"phone" varchar,
  	"city" varchar,
  	"country" varchar,
  	"business_type" varchar,
  	"product" varchar,
  	"preferred_slot" varchar,
  	"message" varchar,
  	"heard_from" varchar,
  	"notes" varchar,
  	"source_page" varchar,
  	"source_landing" varchar,
  	"source_referrer" varchar,
  	"source_utm_source" varchar,
  	"source_utm_medium" varchar,
  	"source_utm_campaign" varchar,
  	"source_utm_term" varchar,
  	"source_gclid" varchar,
  	"source_li_fat_id" varchar,
  	"consent_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "bookings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"status" "enum_bookings_status" DEFAULT 'booked',
  	"name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"start" timestamp(3) with time zone,
  	"end" timestamp(3) with time zone,
  	"time_zone" varchar,
  	"event" varchar,
  	"answers" varchar,
  	"notes" varchar,
  	"cal_uid" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "job_applications" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"status" "enum_job_applications_status" DEFAULT 'new',
  	"name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"phone" varchar,
  	"role" varchar,
  	"experience" varchar,
  	"message" varchar,
  	"resume_id" integer,
  	"notes" varchar,
  	"consent_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "resumes" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"applicant" varchar,
  	"prefix" varchar DEFAULT 'private/resumes',
  	"_objectkey" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"caption" varchar,
  	"prefix" varchar DEFAULT 'media',
  	"_objectkey" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumb_url" varchar,
  	"sizes_thumb_width" numeric,
  	"sizes_thumb_height" numeric,
  	"sizes_thumb_mime_type" varchar,
  	"sizes_thumb_filesize" numeric,
  	"sizes_thumb_filename" varchar,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar,
  	"sizes_hero_url" varchar,
  	"sizes_hero_width" numeric,
  	"sizes_hero_height" numeric,
  	"sizes_hero_mime_type" varchar,
  	"sizes_hero_filesize" numeric,
  	"sizes_hero_filename" varchar
  );
  
  CREATE TABLE "documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"prefix" varchar DEFAULT 'documents',
  	"_objectkey" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "redirects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"from" varchar NOT NULL,
  	"to" varchar NOT NULL,
  	"permanent" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "users_modules" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_users_modules",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"role" "enum_users_role" DEFAULT 'editor' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"reset_password_requested_at" timestamp(3) with time zone,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"products_id" integer,
  	"solutions_id" integer,
  	"industries_id" integer,
  	"countries_id" integer,
  	"cities_id" integer,
  	"case_studies_id" integer,
  	"clients_id" integer,
  	"testimonials_id" integer,
  	"posts_id" integer,
  	"categories_id" integer,
  	"glossary_id" integer,
  	"jobs_id" integer,
  	"legal_id" integer,
  	"leads_id" integer,
  	"bookings_id" integer,
  	"job_applications_id" integer,
  	"resumes_id" integer,
  	"media_id" integer,
  	"documents_id" integer,
  	"redirects_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "home_page_problem_stages" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"stage" varchar,
  	"icon" "enum_home_page_problem_stages_icon",
  	"pain" varchar
  );
  
  CREATE TABLE "home_page_route" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"stage" varchar,
  	"icon" varchar,
  	"headline" varchar,
  	"tag" varchar,
  	"text" varchar,
  	"product_id" integer
  );
  
  CREATE TABLE "home_page_across" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"href" varchar,
  	"icon" varchar,
  	"text" varchar
  );
  
  CREATE TABLE "home_page_ai_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_home_page_ai_points_icon",
  	"title" varchar,
  	"text" varchar
  );
  
  CREATE TABLE "home_page_why" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_home_page_why_icon",
  	"title" varchar,
  	"text" varchar
  );
  
  CREATE TABLE "home_page_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"q" varchar,
  	"a" varchar
  );
  
  CREATE TABLE "home_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_pill_label" varchar,
  	"hero_pill_href" varchar,
  	"hero_title" varchar,
  	"hero_accent" varchar,
  	"hero_lead" varchar,
  	"hero_points" varchar,
  	"hero_primary_label" varchar,
  	"hero_primary_href" varchar,
  	"hero_secondary_label" varchar,
  	"hero_secondary_href" varchar,
  	"hero_note" varchar,
  	"clients_title" varchar,
  	"problem_title" varchar,
  	"problem_lead" varchar,
  	"problem_bridge" varchar,
  	"route_eyebrow" varchar,
  	"route_title" varchar,
  	"route_lead" varchar,
  	"showcase_title" varchar,
  	"showcase_lead" varchar,
  	"showcase_image_id" integer,
  	"solutions_title" varchar,
  	"solutions_lead" varchar,
  	"ai_title" varchar,
  	"ai_lead" varchar,
  	"proof_quote" varchar,
  	"proof_client" varchar,
  	"proof_case_id" integer,
  	"stories_title" varchar,
  	"why_title" varchar,
  	"why_lead" varchar,
  	"ceo_name" varchar,
  	"ceo_role" varchar,
  	"ceo_quote" varchar,
  	"faq_title" varchar,
  	"insights_title" varchar,
  	"cta_title" varchar,
  	"cta_text" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_image_id" integer,
  	"seo_noindex" boolean DEFAULT false,
  	"_status" "enum_home_page_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_home_page_v_version_problem_stages" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"stage" varchar,
  	"icon" "enum__home_page_v_version_problem_stages_icon",
  	"pain" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_page_v_version_route" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"stage" varchar,
  	"icon" varchar,
  	"headline" varchar,
  	"tag" varchar,
  	"text" varchar,
  	"product_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_page_v_version_across" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"href" varchar,
  	"icon" varchar,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_page_v_version_ai_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__home_page_v_version_ai_points_icon",
  	"title" varchar,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_page_v_version_why" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__home_page_v_version_why_icon",
  	"title" varchar,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_page_v_version_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"q" varchar,
  	"a" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_pill_label" varchar,
  	"version_hero_pill_href" varchar,
  	"version_hero_title" varchar,
  	"version_hero_accent" varchar,
  	"version_hero_lead" varchar,
  	"version_hero_points" varchar,
  	"version_hero_primary_label" varchar,
  	"version_hero_primary_href" varchar,
  	"version_hero_secondary_label" varchar,
  	"version_hero_secondary_href" varchar,
  	"version_hero_note" varchar,
  	"version_clients_title" varchar,
  	"version_problem_title" varchar,
  	"version_problem_lead" varchar,
  	"version_problem_bridge" varchar,
  	"version_route_eyebrow" varchar,
  	"version_route_title" varchar,
  	"version_route_lead" varchar,
  	"version_showcase_title" varchar,
  	"version_showcase_lead" varchar,
  	"version_showcase_image_id" integer,
  	"version_solutions_title" varchar,
  	"version_solutions_lead" varchar,
  	"version_ai_title" varchar,
  	"version_ai_lead" varchar,
  	"version_proof_quote" varchar,
  	"version_proof_client" varchar,
  	"version_proof_case_id" integer,
  	"version_stories_title" varchar,
  	"version_why_title" varchar,
  	"version_why_lead" varchar,
  	"version_ceo_name" varchar,
  	"version_ceo_role" varchar,
  	"version_ceo_quote" varchar,
  	"version_faq_title" varchar,
  	"version_insights_title" varchar,
  	"version_cta_title" varchar,
  	"version_cta_text" varchar,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_seo_image_id" integer,
  	"version_seo_noindex" boolean DEFAULT false,
  	"version__status" "enum__home_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "about_page_practices" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_about_page_practices_icon",
  	"title" varchar,
  	"text" varchar
  );
  
  CREATE TABLE "about_page_pillars" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_about_page_pillars_icon",
  	"title" varchar,
  	"text" varchar
  );
  
  CREATE TABLE "about_page_engagement" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_about_page_engagement_icon",
  	"title" varchar,
  	"text" varchar
  );
  
  CREATE TABLE "about_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"accent" varchar,
  	"lead" varchar,
  	"vision" varchar,
  	"mission" varchar,
  	"ceo_photo_id" integer,
  	"ceo_bio" varchar,
  	"process" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_image_id" integer,
  	"seo_noindex" boolean DEFAULT false,
  	"_status" "enum_about_page_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_about_page_v_version_practices" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__about_page_v_version_practices_icon",
  	"title" varchar,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_about_page_v_version_pillars" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__about_page_v_version_pillars_icon",
  	"title" varchar,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_about_page_v_version_engagement" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__about_page_v_version_engagement_icon",
  	"title" varchar,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_about_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_title" varchar,
  	"version_accent" varchar,
  	"version_lead" varchar,
  	"version_vision" varchar,
  	"version_mission" varchar,
  	"version_ceo_photo_id" integer,
  	"version_ceo_bio" varchar,
  	"version_process" varchar,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_seo_image_id" integer,
  	"version_seo_noindex" boolean DEFAULT false,
  	"version__status" "enum__about_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "ai_page_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar,
  	"text" varchar,
  	"points" varchar
  );
  
  CREATE TABLE "ai_page_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_ai_page_benefits_icon",
  	"title" varchar,
  	"text" varchar
  );
  
  CREATE TABLE "ai_page_audiences" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_ai_page_audiences_icon",
  	"title" varchar,
  	"text" varchar
  );
  
  CREATE TABLE "ai_page_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"q" varchar,
  	"a" varchar
  );
  
  CREATE TABLE "ai_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"accent" varchar,
  	"lead" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_image_id" integer,
  	"seo_noindex" boolean DEFAULT false,
  	"_status" "enum_ai_page_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_ai_page_v_version_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar,
  	"text" varchar,
  	"points" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_ai_page_v_version_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__ai_page_v_version_benefits_icon",
  	"title" varchar,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_ai_page_v_version_audiences" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__ai_page_v_version_audiences_icon",
  	"title" varchar,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_ai_page_v_version_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"q" varchar,
  	"a" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_ai_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_title" varchar,
  	"version_accent" varchar,
  	"version_lead" varchar,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_seo_image_id" integer,
  	"version_seo_noindex" boolean DEFAULT false,
  	"version__status" "enum__ai_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "careers_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"accent" varchar,
  	"lead" varchar,
  	"why" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_image_id" integer,
  	"seo_noindex" boolean DEFAULT false,
  	"_status" "enum_careers_page_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_careers_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_title" varchar,
  	"version_accent" varchar,
  	"version_lead" varchar,
  	"version_why" varchar,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_seo_image_id" integer,
  	"version_seo_noindex" boolean DEFAULT false,
  	"version__status" "enum__careers_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "partner_page_why" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar
  );
  
  CREATE TABLE "partner_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"accent" varchar,
  	"lead" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_image_id" integer,
  	"seo_noindex" boolean DEFAULT false,
  	"_status" "enum_partner_page_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_partner_page_v_version_why" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_partner_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_title" varchar,
  	"version_accent" varchar,
  	"version_lead" varchar,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_seo_image_id" integer,
  	"version_seo_noindex" boolean DEFAULT false,
  	"version__status" "enum__partner_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "contact_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"accent" varchar,
  	"lead" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_image_id" integer,
  	"seo_noindex" boolean DEFAULT false,
  	"_status" "enum_contact_page_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_contact_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_title" varchar,
  	"version_accent" varchar,
  	"version_lead" varchar,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_seo_image_id" integer,
  	"version_seo_noindex" boolean DEFAULT false,
  	"version__status" "enum__contact_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "demo_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"accent" varchar,
  	"lead" varchar,
  	"points" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_image_id" integer,
  	"seo_noindex" boolean DEFAULT false,
  	"_status" "enum_demo_page_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_demo_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_title" varchar,
  	"version_accent" varchar,
  	"version_lead" varchar,
  	"version_points" varchar,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_seo_image_id" integer,
  	"version_seo_noindex" boolean DEFAULT false,
  	"version__status" "enum__demo_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "site_settings_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings_social" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" "enum_site_settings_social_label" NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings_footer_countries" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings_trust" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"text" varchar,
  	"image_id" integer
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"legal_name" varchar,
  	"tagline" varchar,
  	"description" varchar,
  	"footer_about" varchar,
  	"company_registered_name" varchar,
  	"company_cin" varchar,
  	"company_gstin" varchar,
  	"email" varchar NOT NULL,
  	"hr_email" varchar,
  	"phone" varchar NOT NULL,
  	"landline" varchar,
  	"whatsapp" varchar,
  	"address_street" varchar,
  	"address_city" varchar,
  	"address_region" varchar,
  	"address_postal_code" varchar,
  	"address_country" varchar DEFAULT 'IN',
  	"map_url" varchar,
  	"hours" varchar,
  	"grievance_name" varchar,
  	"grievance_email" varchar,
  	"grievance_address" varchar,
  	"brochure_title" varchar DEFAULT 'Download the TARGET Suite brochure',
  	"brochure_text" varchar,
  	"brochure_file_id" integer,
  	"brochure_file_url" varchar,
  	"cal_link" varchar,
  	"gtm_id" varchar,
  	"linkedin_partner_id" varchar,
  	"google_verification" varchar,
  	"bing_verification" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "navigation_footer_columns_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "navigation_footer_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL
  );
  
  CREATE TABLE "navigation" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"header_cta_label" varchar NOT NULL,
  	"header_cta_href" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "products_hero_flow" ADD CONSTRAINT "products_hero_flow_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_features" ADD CONSTRAINT "products_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_roles" ADD CONSTRAINT "products_roles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_benefits" ADD CONSTRAINT "products_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_faqs" ADD CONSTRAINT "products_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_problems" ADD CONSTRAINT "products_problems_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_quick_steps" ADD CONSTRAINT "products_quick_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_modes" ADD CONSTRAINT "products_modes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_reports_stats" ADD CONSTRAINT "products_reports_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_reports"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_reports" ADD CONSTRAINT "products_reports_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_reports" ADD CONSTRAINT "products_reports_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_compare_rows" ADD CONSTRAINT "products_compare_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products" ADD CONSTRAINT "products_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products" ADD CONSTRAINT "products_steps_image_id_media_id_fk" FOREIGN KEY ("steps_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products" ADD CONSTRAINT "products_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_version_hero_flow" ADD CONSTRAINT "_products_v_version_hero_flow_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_version_features" ADD CONSTRAINT "_products_v_version_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_version_roles" ADD CONSTRAINT "_products_v_version_roles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_version_benefits" ADD CONSTRAINT "_products_v_version_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_version_faqs" ADD CONSTRAINT "_products_v_version_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_version_problems" ADD CONSTRAINT "_products_v_version_problems_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_version_quick_steps" ADD CONSTRAINT "_products_v_version_quick_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_version_modes" ADD CONSTRAINT "_products_v_version_modes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_version_reports_stats" ADD CONSTRAINT "_products_v_version_reports_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_version_reports"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_version_reports" ADD CONSTRAINT "_products_v_version_reports_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_version_reports" ADD CONSTRAINT "_products_v_version_reports_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_version_compare_rows" ADD CONSTRAINT "_products_v_version_compare_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v" ADD CONSTRAINT "_products_v_parent_id_products_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v" ADD CONSTRAINT "_products_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v" ADD CONSTRAINT "_products_v_version_steps_image_id_media_id_fk" FOREIGN KEY ("version_steps_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v" ADD CONSTRAINT "_products_v_version_seo_image_id_media_id_fk" FOREIGN KEY ("version_seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_rels" ADD CONSTRAINT "_products_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_rels" ADD CONSTRAINT "_products_v_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "solutions_capabilities" ADD CONSTRAINT "solutions_capabilities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."solutions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "solutions_faqs" ADD CONSTRAINT "solutions_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."solutions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "solutions" ADD CONSTRAINT "solutions_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "solutions_rels" ADD CONSTRAINT "solutions_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."solutions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "solutions_rels" ADD CONSTRAINT "solutions_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_solutions_v_version_capabilities" ADD CONSTRAINT "_solutions_v_version_capabilities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_solutions_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_solutions_v_version_faqs" ADD CONSTRAINT "_solutions_v_version_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_solutions_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_solutions_v" ADD CONSTRAINT "_solutions_v_parent_id_solutions_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."solutions"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_solutions_v" ADD CONSTRAINT "_solutions_v_version_seo_image_id_media_id_fk" FOREIGN KEY ("version_seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_solutions_v_rels" ADD CONSTRAINT "_solutions_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_solutions_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_solutions_v_rels" ADD CONSTRAINT "_solutions_v_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "industries_pains" ADD CONSTRAINT "industries_pains_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."industries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "industries_faqs" ADD CONSTRAINT "industries_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."industries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "industries" ADD CONSTRAINT "industries_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "industries_rels" ADD CONSTRAINT "industries_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."industries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "industries_rels" ADD CONSTRAINT "industries_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "industries_rels" ADD CONSTRAINT "industries_rels_solutions_fk" FOREIGN KEY ("solutions_id") REFERENCES "public"."solutions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_industries_v_version_pains" ADD CONSTRAINT "_industries_v_version_pains_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_industries_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_industries_v_version_faqs" ADD CONSTRAINT "_industries_v_version_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_industries_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_industries_v" ADD CONSTRAINT "_industries_v_parent_id_industries_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."industries"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_industries_v" ADD CONSTRAINT "_industries_v_version_seo_image_id_media_id_fk" FOREIGN KEY ("version_seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_industries_v_rels" ADD CONSTRAINT "_industries_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_industries_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_industries_v_rels" ADD CONSTRAINT "_industries_v_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_industries_v_rels" ADD CONSTRAINT "_industries_v_rels_solutions_fk" FOREIGN KEY ("solutions_id") REFERENCES "public"."solutions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "countries_points" ADD CONSTRAINT "countries_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."countries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "countries_faqs" ADD CONSTRAINT "countries_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."countries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "countries" ADD CONSTRAINT "countries_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "countries_rels" ADD CONSTRAINT "countries_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."countries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "countries_rels" ADD CONSTRAINT "countries_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "countries_rels" ADD CONSTRAINT "countries_rels_case_studies_fk" FOREIGN KEY ("case_studies_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_countries_v_version_points" ADD CONSTRAINT "_countries_v_version_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_countries_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_countries_v_version_faqs" ADD CONSTRAINT "_countries_v_version_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_countries_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_countries_v" ADD CONSTRAINT "_countries_v_parent_id_countries_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."countries"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_countries_v" ADD CONSTRAINT "_countries_v_version_seo_image_id_media_id_fk" FOREIGN KEY ("version_seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_countries_v_rels" ADD CONSTRAINT "_countries_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_countries_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_countries_v_rels" ADD CONSTRAINT "_countries_v_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_countries_v_rels" ADD CONSTRAINT "_countries_v_rels_case_studies_fk" FOREIGN KEY ("case_studies_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cities_faqs" ADD CONSTRAINT "cities_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."cities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cities" ADD CONSTRAINT "cities_country_id_countries_id_fk" FOREIGN KEY ("country_id") REFERENCES "public"."countries"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cities" ADD CONSTRAINT "cities_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cities_rels" ADD CONSTRAINT "cities_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."cities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cities_rels" ADD CONSTRAINT "cities_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_cities_v_version_faqs" ADD CONSTRAINT "_cities_v_version_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_cities_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_cities_v" ADD CONSTRAINT "_cities_v_parent_id_cities_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."cities"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_cities_v" ADD CONSTRAINT "_cities_v_version_country_id_countries_id_fk" FOREIGN KEY ("version_country_id") REFERENCES "public"."countries"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_cities_v" ADD CONSTRAINT "_cities_v_version_seo_image_id_media_id_fk" FOREIGN KEY ("version_seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_cities_v_rels" ADD CONSTRAINT "_cities_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_cities_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_cities_v_rels" ADD CONSTRAINT "_cities_v_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_results" ADD CONSTRAINT "case_studies_results_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies" ADD CONSTRAINT "case_studies_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "case_studies" ADD CONSTRAINT "case_studies_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "case_studies" ADD CONSTRAINT "case_studies_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_case_studies_v_version_results" ADD CONSTRAINT "_case_studies_v_version_results_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_case_studies_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_case_studies_v" ADD CONSTRAINT "_case_studies_v_parent_id_case_studies_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."case_studies"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_case_studies_v" ADD CONSTRAINT "_case_studies_v_version_product_id_products_id_fk" FOREIGN KEY ("version_product_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_case_studies_v" ADD CONSTRAINT "_case_studies_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_case_studies_v" ADD CONSTRAINT "_case_studies_v_version_seo_image_id_media_id_fk" FOREIGN KEY ("version_seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "clients" ADD CONSTRAINT "clients_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "clients" ADD CONSTRAINT "clients_case_study_id_case_studies_id_fk" FOREIGN KEY ("case_study_id") REFERENCES "public"."case_studies"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_clients_v" ADD CONSTRAINT "_clients_v_parent_id_clients_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."clients"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_clients_v" ADD CONSTRAINT "_clients_v_version_logo_id_media_id_fk" FOREIGN KEY ("version_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_clients_v" ADD CONSTRAINT "_clients_v_version_case_study_id_case_studies_id_fk" FOREIGN KEY ("version_case_study_id") REFERENCES "public"."case_studies"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "testimonials_rels" ADD CONSTRAINT "testimonials_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "testimonials_rels" ADD CONSTRAINT "testimonials_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_testimonials_v" ADD CONSTRAINT "_testimonials_v_parent_id_testimonials_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."testimonials"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_testimonials_v" ADD CONSTRAINT "_testimonials_v_version_photo_id_media_id_fk" FOREIGN KEY ("version_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_testimonials_v_rels" ADD CONSTRAINT "_testimonials_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_testimonials_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_testimonials_v_rels" ADD CONSTRAINT "_testimonials_v_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_faqs" ADD CONSTRAINT "posts_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_version_faqs" ADD CONSTRAINT "_posts_v_version_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_parent_id_posts_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_seo_image_id_media_id_fk" FOREIGN KEY ("version_seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_category_id_categories_id_fk" FOREIGN KEY ("version_category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "glossary" ADD CONSTRAINT "glossary_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "glossary" ADD CONSTRAINT "glossary_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "glossary_rels" ADD CONSTRAINT "glossary_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."glossary"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "glossary_rels" ADD CONSTRAINT "glossary_rels_glossary_fk" FOREIGN KEY ("glossary_id") REFERENCES "public"."glossary"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_glossary_v" ADD CONSTRAINT "_glossary_v_parent_id_glossary_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."glossary"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_glossary_v" ADD CONSTRAINT "_glossary_v_version_product_id_products_id_fk" FOREIGN KEY ("version_product_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_glossary_v" ADD CONSTRAINT "_glossary_v_version_seo_image_id_media_id_fk" FOREIGN KEY ("version_seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_glossary_v_rels" ADD CONSTRAINT "_glossary_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_glossary_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_glossary_v_rels" ADD CONSTRAINT "_glossary_v_rels_glossary_fk" FOREIGN KEY ("glossary_id") REFERENCES "public"."glossary"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_jobs_v" ADD CONSTRAINT "_jobs_v_parent_id_jobs_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."jobs"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "legal" ADD CONSTRAINT "legal_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_legal_v" ADD CONSTRAINT "_legal_v_parent_id_legal_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."legal"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_legal_v" ADD CONSTRAINT "_legal_v_version_seo_image_id_media_id_fk" FOREIGN KEY ("version_seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "job_applications" ADD CONSTRAINT "job_applications_resume_id_resumes_id_fk" FOREIGN KEY ("resume_id") REFERENCES "public"."resumes"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "users_modules" ADD CONSTRAINT "users_modules_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_solutions_fk" FOREIGN KEY ("solutions_id") REFERENCES "public"."solutions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_industries_fk" FOREIGN KEY ("industries_id") REFERENCES "public"."industries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_countries_fk" FOREIGN KEY ("countries_id") REFERENCES "public"."countries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_cities_fk" FOREIGN KEY ("cities_id") REFERENCES "public"."cities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_case_studies_fk" FOREIGN KEY ("case_studies_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_clients_fk" FOREIGN KEY ("clients_id") REFERENCES "public"."clients"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_glossary_fk" FOREIGN KEY ("glossary_id") REFERENCES "public"."glossary"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_jobs_fk" FOREIGN KEY ("jobs_id") REFERENCES "public"."jobs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_legal_fk" FOREIGN KEY ("legal_id") REFERENCES "public"."legal"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_leads_fk" FOREIGN KEY ("leads_id") REFERENCES "public"."leads"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_bookings_fk" FOREIGN KEY ("bookings_id") REFERENCES "public"."bookings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_job_applications_fk" FOREIGN KEY ("job_applications_id") REFERENCES "public"."job_applications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_resumes_fk" FOREIGN KEY ("resumes_id") REFERENCES "public"."resumes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_documents_fk" FOREIGN KEY ("documents_id") REFERENCES "public"."documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_redirects_fk" FOREIGN KEY ("redirects_id") REFERENCES "public"."redirects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_problem_stages" ADD CONSTRAINT "home_page_problem_stages_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_route" ADD CONSTRAINT "home_page_route_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page_route" ADD CONSTRAINT "home_page_route_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_across" ADD CONSTRAINT "home_page_across_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_ai_points" ADD CONSTRAINT "home_page_ai_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_why" ADD CONSTRAINT "home_page_why_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_faqs" ADD CONSTRAINT "home_page_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page" ADD CONSTRAINT "home_page_showcase_image_id_media_id_fk" FOREIGN KEY ("showcase_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page" ADD CONSTRAINT "home_page_proof_case_id_case_studies_id_fk" FOREIGN KEY ("proof_case_id") REFERENCES "public"."case_studies"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page" ADD CONSTRAINT "home_page_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_page_v_version_problem_stages" ADD CONSTRAINT "_home_page_v_version_problem_stages_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_version_route" ADD CONSTRAINT "_home_page_v_version_route_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_page_v_version_route" ADD CONSTRAINT "_home_page_v_version_route_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_version_across" ADD CONSTRAINT "_home_page_v_version_across_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_version_ai_points" ADD CONSTRAINT "_home_page_v_version_ai_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_version_why" ADD CONSTRAINT "_home_page_v_version_why_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_version_faqs" ADD CONSTRAINT "_home_page_v_version_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v" ADD CONSTRAINT "_home_page_v_version_showcase_image_id_media_id_fk" FOREIGN KEY ("version_showcase_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_page_v" ADD CONSTRAINT "_home_page_v_version_proof_case_id_case_studies_id_fk" FOREIGN KEY ("version_proof_case_id") REFERENCES "public"."case_studies"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_page_v" ADD CONSTRAINT "_home_page_v_version_seo_image_id_media_id_fk" FOREIGN KEY ("version_seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page_practices" ADD CONSTRAINT "about_page_practices_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_pillars" ADD CONSTRAINT "about_page_pillars_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_engagement" ADD CONSTRAINT "about_page_engagement_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page" ADD CONSTRAINT "about_page_ceo_photo_id_media_id_fk" FOREIGN KEY ("ceo_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page" ADD CONSTRAINT "about_page_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_about_page_v_version_practices" ADD CONSTRAINT "_about_page_v_version_practices_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_about_page_v_version_pillars" ADD CONSTRAINT "_about_page_v_version_pillars_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_about_page_v_version_engagement" ADD CONSTRAINT "_about_page_v_version_engagement_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_about_page_v" ADD CONSTRAINT "_about_page_v_version_ceo_photo_id_media_id_fk" FOREIGN KEY ("version_ceo_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_about_page_v" ADD CONSTRAINT "_about_page_v_version_seo_image_id_media_id_fk" FOREIGN KEY ("version_seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ai_page_features" ADD CONSTRAINT "ai_page_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ai_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ai_page_benefits" ADD CONSTRAINT "ai_page_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ai_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ai_page_audiences" ADD CONSTRAINT "ai_page_audiences_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ai_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ai_page_faqs" ADD CONSTRAINT "ai_page_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ai_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ai_page" ADD CONSTRAINT "ai_page_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_ai_page_v_version_features" ADD CONSTRAINT "_ai_page_v_version_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_ai_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ai_page_v_version_benefits" ADD CONSTRAINT "_ai_page_v_version_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_ai_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ai_page_v_version_audiences" ADD CONSTRAINT "_ai_page_v_version_audiences_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_ai_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ai_page_v_version_faqs" ADD CONSTRAINT "_ai_page_v_version_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_ai_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ai_page_v" ADD CONSTRAINT "_ai_page_v_version_seo_image_id_media_id_fk" FOREIGN KEY ("version_seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "careers_page" ADD CONSTRAINT "careers_page_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_careers_page_v" ADD CONSTRAINT "_careers_page_v_version_seo_image_id_media_id_fk" FOREIGN KEY ("version_seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "partner_page_why" ADD CONSTRAINT "partner_page_why_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."partner_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "partner_page" ADD CONSTRAINT "partner_page_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_partner_page_v_version_why" ADD CONSTRAINT "_partner_page_v_version_why_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_partner_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_partner_page_v" ADD CONSTRAINT "_partner_page_v_version_seo_image_id_media_id_fk" FOREIGN KEY ("version_seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contact_page" ADD CONSTRAINT "contact_page_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_contact_page_v" ADD CONSTRAINT "_contact_page_v_version_seo_image_id_media_id_fk" FOREIGN KEY ("version_seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "demo_page" ADD CONSTRAINT "demo_page_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_demo_page_v" ADD CONSTRAINT "_demo_page_v_version_seo_image_id_media_id_fk" FOREIGN KEY ("version_seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings_stats" ADD CONSTRAINT "site_settings_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_social" ADD CONSTRAINT "site_settings_social_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_footer_countries" ADD CONSTRAINT "site_settings_footer_countries_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_trust" ADD CONSTRAINT "site_settings_trust_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings_trust" ADD CONSTRAINT "site_settings_trust_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_brochure_file_id_documents_id_fk" FOREIGN KEY ("brochure_file_id") REFERENCES "public"."documents"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "navigation_footer_columns_links" ADD CONSTRAINT "navigation_footer_columns_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation_footer_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_footer_columns" ADD CONSTRAINT "navigation_footer_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "products_hero_flow_order_idx" ON "products_hero_flow" USING btree ("_order");
  CREATE INDEX "products_hero_flow_parent_id_idx" ON "products_hero_flow" USING btree ("_parent_id");
  CREATE INDEX "products_features_order_idx" ON "products_features" USING btree ("_order");
  CREATE INDEX "products_features_parent_id_idx" ON "products_features" USING btree ("_parent_id");
  CREATE INDEX "products_roles_order_idx" ON "products_roles" USING btree ("_order");
  CREATE INDEX "products_roles_parent_id_idx" ON "products_roles" USING btree ("_parent_id");
  CREATE INDEX "products_benefits_order_idx" ON "products_benefits" USING btree ("_order");
  CREATE INDEX "products_benefits_parent_id_idx" ON "products_benefits" USING btree ("_parent_id");
  CREATE INDEX "products_faqs_order_idx" ON "products_faqs" USING btree ("_order");
  CREATE INDEX "products_faqs_parent_id_idx" ON "products_faqs" USING btree ("_parent_id");
  CREATE INDEX "products_problems_order_idx" ON "products_problems" USING btree ("_order");
  CREATE INDEX "products_problems_parent_id_idx" ON "products_problems" USING btree ("_parent_id");
  CREATE INDEX "products_quick_steps_order_idx" ON "products_quick_steps" USING btree ("_order");
  CREATE INDEX "products_quick_steps_parent_id_idx" ON "products_quick_steps" USING btree ("_parent_id");
  CREATE INDEX "products_modes_order_idx" ON "products_modes" USING btree ("_order");
  CREATE INDEX "products_modes_parent_id_idx" ON "products_modes" USING btree ("_parent_id");
  CREATE INDEX "products_reports_stats_order_idx" ON "products_reports_stats" USING btree ("_order");
  CREATE INDEX "products_reports_stats_parent_id_idx" ON "products_reports_stats" USING btree ("_parent_id");
  CREATE INDEX "products_reports_order_idx" ON "products_reports" USING btree ("_order");
  CREATE INDEX "products_reports_parent_id_idx" ON "products_reports" USING btree ("_parent_id");
  CREATE INDEX "products_reports_image_idx" ON "products_reports" USING btree ("image_id");
  CREATE INDEX "products_compare_rows_order_idx" ON "products_compare_rows" USING btree ("_order");
  CREATE INDEX "products_compare_rows_parent_id_idx" ON "products_compare_rows" USING btree ("_parent_id");
  CREATE INDEX "products_image_idx" ON "products" USING btree ("image_id");
  CREATE INDEX "products_steps_image_idx" ON "products" USING btree ("steps_image_id");
  CREATE INDEX "products_seo_seo_image_idx" ON "products" USING btree ("seo_image_id");
  CREATE UNIQUE INDEX "products_slug_idx" ON "products" USING btree ("slug");
  CREATE INDEX "products_updated_at_idx" ON "products" USING btree ("updated_at");
  CREATE INDEX "products_created_at_idx" ON "products" USING btree ("created_at");
  CREATE INDEX "products__status_idx" ON "products" USING btree ("_status");
  CREATE INDEX "products_rels_order_idx" ON "products_rels" USING btree ("order");
  CREATE INDEX "products_rels_parent_idx" ON "products_rels" USING btree ("parent_id");
  CREATE INDEX "products_rels_path_idx" ON "products_rels" USING btree ("path");
  CREATE INDEX "products_rels_products_id_idx" ON "products_rels" USING btree ("products_id");
  CREATE INDEX "_products_v_version_hero_flow_order_idx" ON "_products_v_version_hero_flow" USING btree ("_order");
  CREATE INDEX "_products_v_version_hero_flow_parent_id_idx" ON "_products_v_version_hero_flow" USING btree ("_parent_id");
  CREATE INDEX "_products_v_version_features_order_idx" ON "_products_v_version_features" USING btree ("_order");
  CREATE INDEX "_products_v_version_features_parent_id_idx" ON "_products_v_version_features" USING btree ("_parent_id");
  CREATE INDEX "_products_v_version_roles_order_idx" ON "_products_v_version_roles" USING btree ("_order");
  CREATE INDEX "_products_v_version_roles_parent_id_idx" ON "_products_v_version_roles" USING btree ("_parent_id");
  CREATE INDEX "_products_v_version_benefits_order_idx" ON "_products_v_version_benefits" USING btree ("_order");
  CREATE INDEX "_products_v_version_benefits_parent_id_idx" ON "_products_v_version_benefits" USING btree ("_parent_id");
  CREATE INDEX "_products_v_version_faqs_order_idx" ON "_products_v_version_faqs" USING btree ("_order");
  CREATE INDEX "_products_v_version_faqs_parent_id_idx" ON "_products_v_version_faqs" USING btree ("_parent_id");
  CREATE INDEX "_products_v_version_problems_order_idx" ON "_products_v_version_problems" USING btree ("_order");
  CREATE INDEX "_products_v_version_problems_parent_id_idx" ON "_products_v_version_problems" USING btree ("_parent_id");
  CREATE INDEX "_products_v_version_quick_steps_order_idx" ON "_products_v_version_quick_steps" USING btree ("_order");
  CREATE INDEX "_products_v_version_quick_steps_parent_id_idx" ON "_products_v_version_quick_steps" USING btree ("_parent_id");
  CREATE INDEX "_products_v_version_modes_order_idx" ON "_products_v_version_modes" USING btree ("_order");
  CREATE INDEX "_products_v_version_modes_parent_id_idx" ON "_products_v_version_modes" USING btree ("_parent_id");
  CREATE INDEX "_products_v_version_reports_stats_order_idx" ON "_products_v_version_reports_stats" USING btree ("_order");
  CREATE INDEX "_products_v_version_reports_stats_parent_id_idx" ON "_products_v_version_reports_stats" USING btree ("_parent_id");
  CREATE INDEX "_products_v_version_reports_order_idx" ON "_products_v_version_reports" USING btree ("_order");
  CREATE INDEX "_products_v_version_reports_parent_id_idx" ON "_products_v_version_reports" USING btree ("_parent_id");
  CREATE INDEX "_products_v_version_reports_image_idx" ON "_products_v_version_reports" USING btree ("image_id");
  CREATE INDEX "_products_v_version_compare_rows_order_idx" ON "_products_v_version_compare_rows" USING btree ("_order");
  CREATE INDEX "_products_v_version_compare_rows_parent_id_idx" ON "_products_v_version_compare_rows" USING btree ("_parent_id");
  CREATE INDEX "_products_v_parent_idx" ON "_products_v" USING btree ("parent_id");
  CREATE INDEX "_products_v_version_version_image_idx" ON "_products_v" USING btree ("version_image_id");
  CREATE INDEX "_products_v_version_version_steps_image_idx" ON "_products_v" USING btree ("version_steps_image_id");
  CREATE INDEX "_products_v_version_seo_version_seo_image_idx" ON "_products_v" USING btree ("version_seo_image_id");
  CREATE INDEX "_products_v_version_version_slug_idx" ON "_products_v" USING btree ("version_slug");
  CREATE INDEX "_products_v_version_version_updated_at_idx" ON "_products_v" USING btree ("version_updated_at");
  CREATE INDEX "_products_v_version_version_created_at_idx" ON "_products_v" USING btree ("version_created_at");
  CREATE INDEX "_products_v_version_version__status_idx" ON "_products_v" USING btree ("version__status");
  CREATE INDEX "_products_v_created_at_idx" ON "_products_v" USING btree ("created_at");
  CREATE INDEX "_products_v_updated_at_idx" ON "_products_v" USING btree ("updated_at");
  CREATE INDEX "_products_v_latest_idx" ON "_products_v" USING btree ("latest");
  CREATE INDEX "_products_v_autosave_idx" ON "_products_v" USING btree ("autosave");
  CREATE INDEX "_products_v_rels_order_idx" ON "_products_v_rels" USING btree ("order");
  CREATE INDEX "_products_v_rels_parent_idx" ON "_products_v_rels" USING btree ("parent_id");
  CREATE INDEX "_products_v_rels_path_idx" ON "_products_v_rels" USING btree ("path");
  CREATE INDEX "_products_v_rels_products_id_idx" ON "_products_v_rels" USING btree ("products_id");
  CREATE INDEX "solutions_capabilities_order_idx" ON "solutions_capabilities" USING btree ("_order");
  CREATE INDEX "solutions_capabilities_parent_id_idx" ON "solutions_capabilities" USING btree ("_parent_id");
  CREATE INDEX "solutions_faqs_order_idx" ON "solutions_faqs" USING btree ("_order");
  CREATE INDEX "solutions_faqs_parent_id_idx" ON "solutions_faqs" USING btree ("_parent_id");
  CREATE INDEX "solutions_seo_seo_image_idx" ON "solutions" USING btree ("seo_image_id");
  CREATE UNIQUE INDEX "solutions_slug_idx" ON "solutions" USING btree ("slug");
  CREATE INDEX "solutions_updated_at_idx" ON "solutions" USING btree ("updated_at");
  CREATE INDEX "solutions_created_at_idx" ON "solutions" USING btree ("created_at");
  CREATE INDEX "solutions__status_idx" ON "solutions" USING btree ("_status");
  CREATE INDEX "solutions_rels_order_idx" ON "solutions_rels" USING btree ("order");
  CREATE INDEX "solutions_rels_parent_idx" ON "solutions_rels" USING btree ("parent_id");
  CREATE INDEX "solutions_rels_path_idx" ON "solutions_rels" USING btree ("path");
  CREATE INDEX "solutions_rels_products_id_idx" ON "solutions_rels" USING btree ("products_id");
  CREATE INDEX "_solutions_v_version_capabilities_order_idx" ON "_solutions_v_version_capabilities" USING btree ("_order");
  CREATE INDEX "_solutions_v_version_capabilities_parent_id_idx" ON "_solutions_v_version_capabilities" USING btree ("_parent_id");
  CREATE INDEX "_solutions_v_version_faqs_order_idx" ON "_solutions_v_version_faqs" USING btree ("_order");
  CREATE INDEX "_solutions_v_version_faqs_parent_id_idx" ON "_solutions_v_version_faqs" USING btree ("_parent_id");
  CREATE INDEX "_solutions_v_parent_idx" ON "_solutions_v" USING btree ("parent_id");
  CREATE INDEX "_solutions_v_version_seo_version_seo_image_idx" ON "_solutions_v" USING btree ("version_seo_image_id");
  CREATE INDEX "_solutions_v_version_version_slug_idx" ON "_solutions_v" USING btree ("version_slug");
  CREATE INDEX "_solutions_v_version_version_updated_at_idx" ON "_solutions_v" USING btree ("version_updated_at");
  CREATE INDEX "_solutions_v_version_version_created_at_idx" ON "_solutions_v" USING btree ("version_created_at");
  CREATE INDEX "_solutions_v_version_version__status_idx" ON "_solutions_v" USING btree ("version__status");
  CREATE INDEX "_solutions_v_created_at_idx" ON "_solutions_v" USING btree ("created_at");
  CREATE INDEX "_solutions_v_updated_at_idx" ON "_solutions_v" USING btree ("updated_at");
  CREATE INDEX "_solutions_v_latest_idx" ON "_solutions_v" USING btree ("latest");
  CREATE INDEX "_solutions_v_autosave_idx" ON "_solutions_v" USING btree ("autosave");
  CREATE INDEX "_solutions_v_rels_order_idx" ON "_solutions_v_rels" USING btree ("order");
  CREATE INDEX "_solutions_v_rels_parent_idx" ON "_solutions_v_rels" USING btree ("parent_id");
  CREATE INDEX "_solutions_v_rels_path_idx" ON "_solutions_v_rels" USING btree ("path");
  CREATE INDEX "_solutions_v_rels_products_id_idx" ON "_solutions_v_rels" USING btree ("products_id");
  CREATE INDEX "industries_pains_order_idx" ON "industries_pains" USING btree ("_order");
  CREATE INDEX "industries_pains_parent_id_idx" ON "industries_pains" USING btree ("_parent_id");
  CREATE INDEX "industries_faqs_order_idx" ON "industries_faqs" USING btree ("_order");
  CREATE INDEX "industries_faqs_parent_id_idx" ON "industries_faqs" USING btree ("_parent_id");
  CREATE INDEX "industries_seo_seo_image_idx" ON "industries" USING btree ("seo_image_id");
  CREATE UNIQUE INDEX "industries_slug_idx" ON "industries" USING btree ("slug");
  CREATE INDEX "industries_updated_at_idx" ON "industries" USING btree ("updated_at");
  CREATE INDEX "industries_created_at_idx" ON "industries" USING btree ("created_at");
  CREATE INDEX "industries__status_idx" ON "industries" USING btree ("_status");
  CREATE INDEX "industries_rels_order_idx" ON "industries_rels" USING btree ("order");
  CREATE INDEX "industries_rels_parent_idx" ON "industries_rels" USING btree ("parent_id");
  CREATE INDEX "industries_rels_path_idx" ON "industries_rels" USING btree ("path");
  CREATE INDEX "industries_rels_products_id_idx" ON "industries_rels" USING btree ("products_id");
  CREATE INDEX "industries_rels_solutions_id_idx" ON "industries_rels" USING btree ("solutions_id");
  CREATE INDEX "_industries_v_version_pains_order_idx" ON "_industries_v_version_pains" USING btree ("_order");
  CREATE INDEX "_industries_v_version_pains_parent_id_idx" ON "_industries_v_version_pains" USING btree ("_parent_id");
  CREATE INDEX "_industries_v_version_faqs_order_idx" ON "_industries_v_version_faqs" USING btree ("_order");
  CREATE INDEX "_industries_v_version_faqs_parent_id_idx" ON "_industries_v_version_faqs" USING btree ("_parent_id");
  CREATE INDEX "_industries_v_parent_idx" ON "_industries_v" USING btree ("parent_id");
  CREATE INDEX "_industries_v_version_seo_version_seo_image_idx" ON "_industries_v" USING btree ("version_seo_image_id");
  CREATE INDEX "_industries_v_version_version_slug_idx" ON "_industries_v" USING btree ("version_slug");
  CREATE INDEX "_industries_v_version_version_updated_at_idx" ON "_industries_v" USING btree ("version_updated_at");
  CREATE INDEX "_industries_v_version_version_created_at_idx" ON "_industries_v" USING btree ("version_created_at");
  CREATE INDEX "_industries_v_version_version__status_idx" ON "_industries_v" USING btree ("version__status");
  CREATE INDEX "_industries_v_created_at_idx" ON "_industries_v" USING btree ("created_at");
  CREATE INDEX "_industries_v_updated_at_idx" ON "_industries_v" USING btree ("updated_at");
  CREATE INDEX "_industries_v_latest_idx" ON "_industries_v" USING btree ("latest");
  CREATE INDEX "_industries_v_autosave_idx" ON "_industries_v" USING btree ("autosave");
  CREATE INDEX "_industries_v_rels_order_idx" ON "_industries_v_rels" USING btree ("order");
  CREATE INDEX "_industries_v_rels_parent_idx" ON "_industries_v_rels" USING btree ("parent_id");
  CREATE INDEX "_industries_v_rels_path_idx" ON "_industries_v_rels" USING btree ("path");
  CREATE INDEX "_industries_v_rels_products_id_idx" ON "_industries_v_rels" USING btree ("products_id");
  CREATE INDEX "_industries_v_rels_solutions_id_idx" ON "_industries_v_rels" USING btree ("solutions_id");
  CREATE INDEX "countries_points_order_idx" ON "countries_points" USING btree ("_order");
  CREATE INDEX "countries_points_parent_id_idx" ON "countries_points" USING btree ("_parent_id");
  CREATE INDEX "countries_faqs_order_idx" ON "countries_faqs" USING btree ("_order");
  CREATE INDEX "countries_faqs_parent_id_idx" ON "countries_faqs" USING btree ("_parent_id");
  CREATE INDEX "countries_seo_seo_image_idx" ON "countries" USING btree ("seo_image_id");
  CREATE UNIQUE INDEX "countries_slug_idx" ON "countries" USING btree ("slug");
  CREATE INDEX "countries_updated_at_idx" ON "countries" USING btree ("updated_at");
  CREATE INDEX "countries_created_at_idx" ON "countries" USING btree ("created_at");
  CREATE INDEX "countries__status_idx" ON "countries" USING btree ("_status");
  CREATE INDEX "countries_rels_order_idx" ON "countries_rels" USING btree ("order");
  CREATE INDEX "countries_rels_parent_idx" ON "countries_rels" USING btree ("parent_id");
  CREATE INDEX "countries_rels_path_idx" ON "countries_rels" USING btree ("path");
  CREATE INDEX "countries_rels_products_id_idx" ON "countries_rels" USING btree ("products_id");
  CREATE INDEX "countries_rels_case_studies_id_idx" ON "countries_rels" USING btree ("case_studies_id");
  CREATE INDEX "_countries_v_version_points_order_idx" ON "_countries_v_version_points" USING btree ("_order");
  CREATE INDEX "_countries_v_version_points_parent_id_idx" ON "_countries_v_version_points" USING btree ("_parent_id");
  CREATE INDEX "_countries_v_version_faqs_order_idx" ON "_countries_v_version_faqs" USING btree ("_order");
  CREATE INDEX "_countries_v_version_faqs_parent_id_idx" ON "_countries_v_version_faqs" USING btree ("_parent_id");
  CREATE INDEX "_countries_v_parent_idx" ON "_countries_v" USING btree ("parent_id");
  CREATE INDEX "_countries_v_version_seo_version_seo_image_idx" ON "_countries_v" USING btree ("version_seo_image_id");
  CREATE INDEX "_countries_v_version_version_slug_idx" ON "_countries_v" USING btree ("version_slug");
  CREATE INDEX "_countries_v_version_version_updated_at_idx" ON "_countries_v" USING btree ("version_updated_at");
  CREATE INDEX "_countries_v_version_version_created_at_idx" ON "_countries_v" USING btree ("version_created_at");
  CREATE INDEX "_countries_v_version_version__status_idx" ON "_countries_v" USING btree ("version__status");
  CREATE INDEX "_countries_v_created_at_idx" ON "_countries_v" USING btree ("created_at");
  CREATE INDEX "_countries_v_updated_at_idx" ON "_countries_v" USING btree ("updated_at");
  CREATE INDEX "_countries_v_latest_idx" ON "_countries_v" USING btree ("latest");
  CREATE INDEX "_countries_v_autosave_idx" ON "_countries_v" USING btree ("autosave");
  CREATE INDEX "_countries_v_rels_order_idx" ON "_countries_v_rels" USING btree ("order");
  CREATE INDEX "_countries_v_rels_parent_idx" ON "_countries_v_rels" USING btree ("parent_id");
  CREATE INDEX "_countries_v_rels_path_idx" ON "_countries_v_rels" USING btree ("path");
  CREATE INDEX "_countries_v_rels_products_id_idx" ON "_countries_v_rels" USING btree ("products_id");
  CREATE INDEX "_countries_v_rels_case_studies_id_idx" ON "_countries_v_rels" USING btree ("case_studies_id");
  CREATE INDEX "cities_faqs_order_idx" ON "cities_faqs" USING btree ("_order");
  CREATE INDEX "cities_faqs_parent_id_idx" ON "cities_faqs" USING btree ("_parent_id");
  CREATE INDEX "cities_country_idx" ON "cities" USING btree ("country_id");
  CREATE INDEX "cities_seo_seo_image_idx" ON "cities" USING btree ("seo_image_id");
  CREATE UNIQUE INDEX "cities_slug_idx" ON "cities" USING btree ("slug");
  CREATE INDEX "cities_updated_at_idx" ON "cities" USING btree ("updated_at");
  CREATE INDEX "cities_created_at_idx" ON "cities" USING btree ("created_at");
  CREATE INDEX "cities__status_idx" ON "cities" USING btree ("_status");
  CREATE INDEX "cities_rels_order_idx" ON "cities_rels" USING btree ("order");
  CREATE INDEX "cities_rels_parent_idx" ON "cities_rels" USING btree ("parent_id");
  CREATE INDEX "cities_rels_path_idx" ON "cities_rels" USING btree ("path");
  CREATE INDEX "cities_rels_products_id_idx" ON "cities_rels" USING btree ("products_id");
  CREATE INDEX "_cities_v_version_faqs_order_idx" ON "_cities_v_version_faqs" USING btree ("_order");
  CREATE INDEX "_cities_v_version_faqs_parent_id_idx" ON "_cities_v_version_faqs" USING btree ("_parent_id");
  CREATE INDEX "_cities_v_parent_idx" ON "_cities_v" USING btree ("parent_id");
  CREATE INDEX "_cities_v_version_version_country_idx" ON "_cities_v" USING btree ("version_country_id");
  CREATE INDEX "_cities_v_version_seo_version_seo_image_idx" ON "_cities_v" USING btree ("version_seo_image_id");
  CREATE INDEX "_cities_v_version_version_slug_idx" ON "_cities_v" USING btree ("version_slug");
  CREATE INDEX "_cities_v_version_version_updated_at_idx" ON "_cities_v" USING btree ("version_updated_at");
  CREATE INDEX "_cities_v_version_version_created_at_idx" ON "_cities_v" USING btree ("version_created_at");
  CREATE INDEX "_cities_v_version_version__status_idx" ON "_cities_v" USING btree ("version__status");
  CREATE INDEX "_cities_v_created_at_idx" ON "_cities_v" USING btree ("created_at");
  CREATE INDEX "_cities_v_updated_at_idx" ON "_cities_v" USING btree ("updated_at");
  CREATE INDEX "_cities_v_latest_idx" ON "_cities_v" USING btree ("latest");
  CREATE INDEX "_cities_v_autosave_idx" ON "_cities_v" USING btree ("autosave");
  CREATE INDEX "_cities_v_rels_order_idx" ON "_cities_v_rels" USING btree ("order");
  CREATE INDEX "_cities_v_rels_parent_idx" ON "_cities_v_rels" USING btree ("parent_id");
  CREATE INDEX "_cities_v_rels_path_idx" ON "_cities_v_rels" USING btree ("path");
  CREATE INDEX "_cities_v_rels_products_id_idx" ON "_cities_v_rels" USING btree ("products_id");
  CREATE INDEX "case_studies_results_order_idx" ON "case_studies_results" USING btree ("_order");
  CREATE INDEX "case_studies_results_parent_id_idx" ON "case_studies_results" USING btree ("_parent_id");
  CREATE INDEX "case_studies_product_idx" ON "case_studies" USING btree ("product_id");
  CREATE INDEX "case_studies_image_idx" ON "case_studies" USING btree ("image_id");
  CREATE INDEX "case_studies_legacy_id_idx" ON "case_studies" USING btree ("legacy_id");
  CREATE INDEX "case_studies_seo_seo_image_idx" ON "case_studies" USING btree ("seo_image_id");
  CREATE UNIQUE INDEX "case_studies_slug_idx" ON "case_studies" USING btree ("slug");
  CREATE INDEX "case_studies_updated_at_idx" ON "case_studies" USING btree ("updated_at");
  CREATE INDEX "case_studies_created_at_idx" ON "case_studies" USING btree ("created_at");
  CREATE INDEX "case_studies__status_idx" ON "case_studies" USING btree ("_status");
  CREATE INDEX "_case_studies_v_version_results_order_idx" ON "_case_studies_v_version_results" USING btree ("_order");
  CREATE INDEX "_case_studies_v_version_results_parent_id_idx" ON "_case_studies_v_version_results" USING btree ("_parent_id");
  CREATE INDEX "_case_studies_v_parent_idx" ON "_case_studies_v" USING btree ("parent_id");
  CREATE INDEX "_case_studies_v_version_version_product_idx" ON "_case_studies_v" USING btree ("version_product_id");
  CREATE INDEX "_case_studies_v_version_version_image_idx" ON "_case_studies_v" USING btree ("version_image_id");
  CREATE INDEX "_case_studies_v_version_version_legacy_id_idx" ON "_case_studies_v" USING btree ("version_legacy_id");
  CREATE INDEX "_case_studies_v_version_seo_version_seo_image_idx" ON "_case_studies_v" USING btree ("version_seo_image_id");
  CREATE INDEX "_case_studies_v_version_version_slug_idx" ON "_case_studies_v" USING btree ("version_slug");
  CREATE INDEX "_case_studies_v_version_version_updated_at_idx" ON "_case_studies_v" USING btree ("version_updated_at");
  CREATE INDEX "_case_studies_v_version_version_created_at_idx" ON "_case_studies_v" USING btree ("version_created_at");
  CREATE INDEX "_case_studies_v_version_version__status_idx" ON "_case_studies_v" USING btree ("version__status");
  CREATE INDEX "_case_studies_v_created_at_idx" ON "_case_studies_v" USING btree ("created_at");
  CREATE INDEX "_case_studies_v_updated_at_idx" ON "_case_studies_v" USING btree ("updated_at");
  CREATE INDEX "_case_studies_v_latest_idx" ON "_case_studies_v" USING btree ("latest");
  CREATE INDEX "_case_studies_v_autosave_idx" ON "_case_studies_v" USING btree ("autosave");
  CREATE INDEX "clients_logo_idx" ON "clients" USING btree ("logo_id");
  CREATE INDEX "clients_case_study_idx" ON "clients" USING btree ("case_study_id");
  CREATE INDEX "clients_updated_at_idx" ON "clients" USING btree ("updated_at");
  CREATE INDEX "clients_created_at_idx" ON "clients" USING btree ("created_at");
  CREATE INDEX "clients__status_idx" ON "clients" USING btree ("_status");
  CREATE INDEX "_clients_v_parent_idx" ON "_clients_v" USING btree ("parent_id");
  CREATE INDEX "_clients_v_version_version_logo_idx" ON "_clients_v" USING btree ("version_logo_id");
  CREATE INDEX "_clients_v_version_version_case_study_idx" ON "_clients_v" USING btree ("version_case_study_id");
  CREATE INDEX "_clients_v_version_version_updated_at_idx" ON "_clients_v" USING btree ("version_updated_at");
  CREATE INDEX "_clients_v_version_version_created_at_idx" ON "_clients_v" USING btree ("version_created_at");
  CREATE INDEX "_clients_v_version_version__status_idx" ON "_clients_v" USING btree ("version__status");
  CREATE INDEX "_clients_v_created_at_idx" ON "_clients_v" USING btree ("created_at");
  CREATE INDEX "_clients_v_updated_at_idx" ON "_clients_v" USING btree ("updated_at");
  CREATE INDEX "_clients_v_latest_idx" ON "_clients_v" USING btree ("latest");
  CREATE INDEX "_clients_v_autosave_idx" ON "_clients_v" USING btree ("autosave");
  CREATE INDEX "testimonials_photo_idx" ON "testimonials" USING btree ("photo_id");
  CREATE INDEX "testimonials_updated_at_idx" ON "testimonials" USING btree ("updated_at");
  CREATE INDEX "testimonials_created_at_idx" ON "testimonials" USING btree ("created_at");
  CREATE INDEX "testimonials__status_idx" ON "testimonials" USING btree ("_status");
  CREATE INDEX "testimonials_rels_order_idx" ON "testimonials_rels" USING btree ("order");
  CREATE INDEX "testimonials_rels_parent_idx" ON "testimonials_rels" USING btree ("parent_id");
  CREATE INDEX "testimonials_rels_path_idx" ON "testimonials_rels" USING btree ("path");
  CREATE INDEX "testimonials_rels_products_id_idx" ON "testimonials_rels" USING btree ("products_id");
  CREATE INDEX "_testimonials_v_parent_idx" ON "_testimonials_v" USING btree ("parent_id");
  CREATE INDEX "_testimonials_v_version_version_photo_idx" ON "_testimonials_v" USING btree ("version_photo_id");
  CREATE INDEX "_testimonials_v_version_version_updated_at_idx" ON "_testimonials_v" USING btree ("version_updated_at");
  CREATE INDEX "_testimonials_v_version_version_created_at_idx" ON "_testimonials_v" USING btree ("version_created_at");
  CREATE INDEX "_testimonials_v_version_version__status_idx" ON "_testimonials_v" USING btree ("version__status");
  CREATE INDEX "_testimonials_v_created_at_idx" ON "_testimonials_v" USING btree ("created_at");
  CREATE INDEX "_testimonials_v_updated_at_idx" ON "_testimonials_v" USING btree ("updated_at");
  CREATE INDEX "_testimonials_v_latest_idx" ON "_testimonials_v" USING btree ("latest");
  CREATE INDEX "_testimonials_v_autosave_idx" ON "_testimonials_v" USING btree ("autosave");
  CREATE INDEX "_testimonials_v_rels_order_idx" ON "_testimonials_v_rels" USING btree ("order");
  CREATE INDEX "_testimonials_v_rels_parent_idx" ON "_testimonials_v_rels" USING btree ("parent_id");
  CREATE INDEX "_testimonials_v_rels_path_idx" ON "_testimonials_v_rels" USING btree ("path");
  CREATE INDEX "_testimonials_v_rels_products_id_idx" ON "_testimonials_v_rels" USING btree ("products_id");
  CREATE INDEX "posts_faqs_order_idx" ON "posts_faqs" USING btree ("_order");
  CREATE INDEX "posts_faqs_parent_id_idx" ON "posts_faqs" USING btree ("_parent_id");
  CREATE INDEX "posts_image_idx" ON "posts" USING btree ("image_id");
  CREATE INDEX "posts_seo_seo_image_idx" ON "posts" USING btree ("seo_image_id");
  CREATE UNIQUE INDEX "posts_slug_idx" ON "posts" USING btree ("slug");
  CREATE INDEX "posts_category_idx" ON "posts" USING btree ("category_id");
  CREATE INDEX "posts_legacy_id_idx" ON "posts" USING btree ("legacy_id");
  CREATE INDEX "posts_updated_at_idx" ON "posts" USING btree ("updated_at");
  CREATE INDEX "posts_created_at_idx" ON "posts" USING btree ("created_at");
  CREATE INDEX "posts__status_idx" ON "posts" USING btree ("_status");
  CREATE INDEX "_posts_v_version_faqs_order_idx" ON "_posts_v_version_faqs" USING btree ("_order");
  CREATE INDEX "_posts_v_version_faqs_parent_id_idx" ON "_posts_v_version_faqs" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_parent_idx" ON "_posts_v" USING btree ("parent_id");
  CREATE INDEX "_posts_v_version_version_image_idx" ON "_posts_v" USING btree ("version_image_id");
  CREATE INDEX "_posts_v_version_seo_version_seo_image_idx" ON "_posts_v" USING btree ("version_seo_image_id");
  CREATE INDEX "_posts_v_version_version_slug_idx" ON "_posts_v" USING btree ("version_slug");
  CREATE INDEX "_posts_v_version_version_category_idx" ON "_posts_v" USING btree ("version_category_id");
  CREATE INDEX "_posts_v_version_version_legacy_id_idx" ON "_posts_v" USING btree ("version_legacy_id");
  CREATE INDEX "_posts_v_version_version_updated_at_idx" ON "_posts_v" USING btree ("version_updated_at");
  CREATE INDEX "_posts_v_version_version_created_at_idx" ON "_posts_v" USING btree ("version_created_at");
  CREATE INDEX "_posts_v_version_version__status_idx" ON "_posts_v" USING btree ("version__status");
  CREATE INDEX "_posts_v_created_at_idx" ON "_posts_v" USING btree ("created_at");
  CREATE INDEX "_posts_v_updated_at_idx" ON "_posts_v" USING btree ("updated_at");
  CREATE INDEX "_posts_v_latest_idx" ON "_posts_v" USING btree ("latest");
  CREATE INDEX "_posts_v_autosave_idx" ON "_posts_v" USING btree ("autosave");
  CREATE UNIQUE INDEX "categories_slug_idx" ON "categories" USING btree ("slug");
  CREATE INDEX "categories_updated_at_idx" ON "categories" USING btree ("updated_at");
  CREATE INDEX "categories_created_at_idx" ON "categories" USING btree ("created_at");
  CREATE INDEX "glossary_product_idx" ON "glossary" USING btree ("product_id");
  CREATE INDEX "glossary_seo_seo_image_idx" ON "glossary" USING btree ("seo_image_id");
  CREATE UNIQUE INDEX "glossary_slug_idx" ON "glossary" USING btree ("slug");
  CREATE INDEX "glossary_updated_at_idx" ON "glossary" USING btree ("updated_at");
  CREATE INDEX "glossary_created_at_idx" ON "glossary" USING btree ("created_at");
  CREATE INDEX "glossary__status_idx" ON "glossary" USING btree ("_status");
  CREATE INDEX "glossary_rels_order_idx" ON "glossary_rels" USING btree ("order");
  CREATE INDEX "glossary_rels_parent_idx" ON "glossary_rels" USING btree ("parent_id");
  CREATE INDEX "glossary_rels_path_idx" ON "glossary_rels" USING btree ("path");
  CREATE INDEX "glossary_rels_glossary_id_idx" ON "glossary_rels" USING btree ("glossary_id");
  CREATE INDEX "_glossary_v_parent_idx" ON "_glossary_v" USING btree ("parent_id");
  CREATE INDEX "_glossary_v_version_version_product_idx" ON "_glossary_v" USING btree ("version_product_id");
  CREATE INDEX "_glossary_v_version_seo_version_seo_image_idx" ON "_glossary_v" USING btree ("version_seo_image_id");
  CREATE INDEX "_glossary_v_version_version_slug_idx" ON "_glossary_v" USING btree ("version_slug");
  CREATE INDEX "_glossary_v_version_version_updated_at_idx" ON "_glossary_v" USING btree ("version_updated_at");
  CREATE INDEX "_glossary_v_version_version_created_at_idx" ON "_glossary_v" USING btree ("version_created_at");
  CREATE INDEX "_glossary_v_version_version__status_idx" ON "_glossary_v" USING btree ("version__status");
  CREATE INDEX "_glossary_v_created_at_idx" ON "_glossary_v" USING btree ("created_at");
  CREATE INDEX "_glossary_v_updated_at_idx" ON "_glossary_v" USING btree ("updated_at");
  CREATE INDEX "_glossary_v_latest_idx" ON "_glossary_v" USING btree ("latest");
  CREATE INDEX "_glossary_v_autosave_idx" ON "_glossary_v" USING btree ("autosave");
  CREATE INDEX "_glossary_v_rels_order_idx" ON "_glossary_v_rels" USING btree ("order");
  CREATE INDEX "_glossary_v_rels_parent_idx" ON "_glossary_v_rels" USING btree ("parent_id");
  CREATE INDEX "_glossary_v_rels_path_idx" ON "_glossary_v_rels" USING btree ("path");
  CREATE INDEX "_glossary_v_rels_glossary_id_idx" ON "_glossary_v_rels" USING btree ("glossary_id");
  CREATE UNIQUE INDEX "jobs_slug_idx" ON "jobs" USING btree ("slug");
  CREATE INDEX "jobs_updated_at_idx" ON "jobs" USING btree ("updated_at");
  CREATE INDEX "jobs_created_at_idx" ON "jobs" USING btree ("created_at");
  CREATE INDEX "jobs__status_idx" ON "jobs" USING btree ("_status");
  CREATE INDEX "_jobs_v_parent_idx" ON "_jobs_v" USING btree ("parent_id");
  CREATE INDEX "_jobs_v_version_version_slug_idx" ON "_jobs_v" USING btree ("version_slug");
  CREATE INDEX "_jobs_v_version_version_updated_at_idx" ON "_jobs_v" USING btree ("version_updated_at");
  CREATE INDEX "_jobs_v_version_version_created_at_idx" ON "_jobs_v" USING btree ("version_created_at");
  CREATE INDEX "_jobs_v_version_version__status_idx" ON "_jobs_v" USING btree ("version__status");
  CREATE INDEX "_jobs_v_created_at_idx" ON "_jobs_v" USING btree ("created_at");
  CREATE INDEX "_jobs_v_updated_at_idx" ON "_jobs_v" USING btree ("updated_at");
  CREATE INDEX "_jobs_v_latest_idx" ON "_jobs_v" USING btree ("latest");
  CREATE INDEX "_jobs_v_autosave_idx" ON "_jobs_v" USING btree ("autosave");
  CREATE INDEX "legal_seo_seo_image_idx" ON "legal" USING btree ("seo_image_id");
  CREATE UNIQUE INDEX "legal_slug_idx" ON "legal" USING btree ("slug");
  CREATE INDEX "legal_updated_at_idx" ON "legal" USING btree ("updated_at");
  CREATE INDEX "legal_created_at_idx" ON "legal" USING btree ("created_at");
  CREATE INDEX "legal__status_idx" ON "legal" USING btree ("_status");
  CREATE INDEX "_legal_v_parent_idx" ON "_legal_v" USING btree ("parent_id");
  CREATE INDEX "_legal_v_version_seo_version_seo_image_idx" ON "_legal_v" USING btree ("version_seo_image_id");
  CREATE INDEX "_legal_v_version_version_slug_idx" ON "_legal_v" USING btree ("version_slug");
  CREATE INDEX "_legal_v_version_version_updated_at_idx" ON "_legal_v" USING btree ("version_updated_at");
  CREATE INDEX "_legal_v_version_version_created_at_idx" ON "_legal_v" USING btree ("version_created_at");
  CREATE INDEX "_legal_v_version_version__status_idx" ON "_legal_v" USING btree ("version__status");
  CREATE INDEX "_legal_v_created_at_idx" ON "_legal_v" USING btree ("created_at");
  CREATE INDEX "_legal_v_updated_at_idx" ON "_legal_v" USING btree ("updated_at");
  CREATE INDEX "_legal_v_latest_idx" ON "_legal_v" USING btree ("latest");
  CREATE INDEX "_legal_v_autosave_idx" ON "_legal_v" USING btree ("autosave");
  CREATE INDEX "leads_updated_at_idx" ON "leads" USING btree ("updated_at");
  CREATE INDEX "leads_created_at_idx" ON "leads" USING btree ("created_at");
  CREATE UNIQUE INDEX "bookings_cal_uid_idx" ON "bookings" USING btree ("cal_uid");
  CREATE INDEX "bookings_updated_at_idx" ON "bookings" USING btree ("updated_at");
  CREATE INDEX "bookings_created_at_idx" ON "bookings" USING btree ("created_at");
  CREATE INDEX "job_applications_resume_idx" ON "job_applications" USING btree ("resume_id");
  CREATE INDEX "job_applications_updated_at_idx" ON "job_applications" USING btree ("updated_at");
  CREATE INDEX "job_applications_created_at_idx" ON "job_applications" USING btree ("created_at");
  CREATE INDEX "resumes_updated_at_idx" ON "resumes" USING btree ("updated_at");
  CREATE INDEX "resumes_created_at_idx" ON "resumes" USING btree ("created_at");
  CREATE UNIQUE INDEX "resumes_filename_idx" ON "resumes" USING btree ("filename");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumb_sizes_thumb_filename_idx" ON "media" USING btree ("sizes_thumb_filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX "media_sizes_hero_sizes_hero_filename_idx" ON "media" USING btree ("sizes_hero_filename");
  CREATE INDEX "documents_updated_at_idx" ON "documents" USING btree ("updated_at");
  CREATE INDEX "documents_created_at_idx" ON "documents" USING btree ("created_at");
  CREATE UNIQUE INDEX "documents_filename_idx" ON "documents" USING btree ("filename");
  CREATE UNIQUE INDEX "redirects_from_idx" ON "redirects" USING btree ("from");
  CREATE INDEX "redirects_updated_at_idx" ON "redirects" USING btree ("updated_at");
  CREATE INDEX "redirects_created_at_idx" ON "redirects" USING btree ("created_at");
  CREATE INDEX "users_modules_order_idx" ON "users_modules" USING btree ("order");
  CREATE INDEX "users_modules_parent_idx" ON "users_modules" USING btree ("parent_id");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_products_id_idx" ON "payload_locked_documents_rels" USING btree ("products_id");
  CREATE INDEX "payload_locked_documents_rels_solutions_id_idx" ON "payload_locked_documents_rels" USING btree ("solutions_id");
  CREATE INDEX "payload_locked_documents_rels_industries_id_idx" ON "payload_locked_documents_rels" USING btree ("industries_id");
  CREATE INDEX "payload_locked_documents_rels_countries_id_idx" ON "payload_locked_documents_rels" USING btree ("countries_id");
  CREATE INDEX "payload_locked_documents_rels_cities_id_idx" ON "payload_locked_documents_rels" USING btree ("cities_id");
  CREATE INDEX "payload_locked_documents_rels_case_studies_id_idx" ON "payload_locked_documents_rels" USING btree ("case_studies_id");
  CREATE INDEX "payload_locked_documents_rels_clients_id_idx" ON "payload_locked_documents_rels" USING btree ("clients_id");
  CREATE INDEX "payload_locked_documents_rels_testimonials_id_idx" ON "payload_locked_documents_rels" USING btree ("testimonials_id");
  CREATE INDEX "payload_locked_documents_rels_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("posts_id");
  CREATE INDEX "payload_locked_documents_rels_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("categories_id");
  CREATE INDEX "payload_locked_documents_rels_glossary_id_idx" ON "payload_locked_documents_rels" USING btree ("glossary_id");
  CREATE INDEX "payload_locked_documents_rels_jobs_id_idx" ON "payload_locked_documents_rels" USING btree ("jobs_id");
  CREATE INDEX "payload_locked_documents_rels_legal_id_idx" ON "payload_locked_documents_rels" USING btree ("legal_id");
  CREATE INDEX "payload_locked_documents_rels_leads_id_idx" ON "payload_locked_documents_rels" USING btree ("leads_id");
  CREATE INDEX "payload_locked_documents_rels_bookings_id_idx" ON "payload_locked_documents_rels" USING btree ("bookings_id");
  CREATE INDEX "payload_locked_documents_rels_job_applications_id_idx" ON "payload_locked_documents_rels" USING btree ("job_applications_id");
  CREATE INDEX "payload_locked_documents_rels_resumes_id_idx" ON "payload_locked_documents_rels" USING btree ("resumes_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_documents_id_idx" ON "payload_locked_documents_rels" USING btree ("documents_id");
  CREATE INDEX "payload_locked_documents_rels_redirects_id_idx" ON "payload_locked_documents_rels" USING btree ("redirects_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "home_page_problem_stages_order_idx" ON "home_page_problem_stages" USING btree ("_order");
  CREATE INDEX "home_page_problem_stages_parent_id_idx" ON "home_page_problem_stages" USING btree ("_parent_id");
  CREATE INDEX "home_page_route_order_idx" ON "home_page_route" USING btree ("_order");
  CREATE INDEX "home_page_route_parent_id_idx" ON "home_page_route" USING btree ("_parent_id");
  CREATE INDEX "home_page_route_product_idx" ON "home_page_route" USING btree ("product_id");
  CREATE INDEX "home_page_across_order_idx" ON "home_page_across" USING btree ("_order");
  CREATE INDEX "home_page_across_parent_id_idx" ON "home_page_across" USING btree ("_parent_id");
  CREATE INDEX "home_page_ai_points_order_idx" ON "home_page_ai_points" USING btree ("_order");
  CREATE INDEX "home_page_ai_points_parent_id_idx" ON "home_page_ai_points" USING btree ("_parent_id");
  CREATE INDEX "home_page_why_order_idx" ON "home_page_why" USING btree ("_order");
  CREATE INDEX "home_page_why_parent_id_idx" ON "home_page_why" USING btree ("_parent_id");
  CREATE INDEX "home_page_faqs_order_idx" ON "home_page_faqs" USING btree ("_order");
  CREATE INDEX "home_page_faqs_parent_id_idx" ON "home_page_faqs" USING btree ("_parent_id");
  CREATE INDEX "home_page_showcase_image_idx" ON "home_page" USING btree ("showcase_image_id");
  CREATE INDEX "home_page_proof_case_idx" ON "home_page" USING btree ("proof_case_id");
  CREATE INDEX "home_page_seo_seo_image_idx" ON "home_page" USING btree ("seo_image_id");
  CREATE INDEX "home_page__status_idx" ON "home_page" USING btree ("_status");
  CREATE INDEX "_home_page_v_version_problem_stages_order_idx" ON "_home_page_v_version_problem_stages" USING btree ("_order");
  CREATE INDEX "_home_page_v_version_problem_stages_parent_id_idx" ON "_home_page_v_version_problem_stages" USING btree ("_parent_id");
  CREATE INDEX "_home_page_v_version_route_order_idx" ON "_home_page_v_version_route" USING btree ("_order");
  CREATE INDEX "_home_page_v_version_route_parent_id_idx" ON "_home_page_v_version_route" USING btree ("_parent_id");
  CREATE INDEX "_home_page_v_version_route_product_idx" ON "_home_page_v_version_route" USING btree ("product_id");
  CREATE INDEX "_home_page_v_version_across_order_idx" ON "_home_page_v_version_across" USING btree ("_order");
  CREATE INDEX "_home_page_v_version_across_parent_id_idx" ON "_home_page_v_version_across" USING btree ("_parent_id");
  CREATE INDEX "_home_page_v_version_ai_points_order_idx" ON "_home_page_v_version_ai_points" USING btree ("_order");
  CREATE INDEX "_home_page_v_version_ai_points_parent_id_idx" ON "_home_page_v_version_ai_points" USING btree ("_parent_id");
  CREATE INDEX "_home_page_v_version_why_order_idx" ON "_home_page_v_version_why" USING btree ("_order");
  CREATE INDEX "_home_page_v_version_why_parent_id_idx" ON "_home_page_v_version_why" USING btree ("_parent_id");
  CREATE INDEX "_home_page_v_version_faqs_order_idx" ON "_home_page_v_version_faqs" USING btree ("_order");
  CREATE INDEX "_home_page_v_version_faqs_parent_id_idx" ON "_home_page_v_version_faqs" USING btree ("_parent_id");
  CREATE INDEX "_home_page_v_version_version_showcase_image_idx" ON "_home_page_v" USING btree ("version_showcase_image_id");
  CREATE INDEX "_home_page_v_version_version_proof_case_idx" ON "_home_page_v" USING btree ("version_proof_case_id");
  CREATE INDEX "_home_page_v_version_seo_version_seo_image_idx" ON "_home_page_v" USING btree ("version_seo_image_id");
  CREATE INDEX "_home_page_v_version_version__status_idx" ON "_home_page_v" USING btree ("version__status");
  CREATE INDEX "_home_page_v_created_at_idx" ON "_home_page_v" USING btree ("created_at");
  CREATE INDEX "_home_page_v_updated_at_idx" ON "_home_page_v" USING btree ("updated_at");
  CREATE INDEX "_home_page_v_latest_idx" ON "_home_page_v" USING btree ("latest");
  CREATE INDEX "_home_page_v_autosave_idx" ON "_home_page_v" USING btree ("autosave");
  CREATE INDEX "about_page_practices_order_idx" ON "about_page_practices" USING btree ("_order");
  CREATE INDEX "about_page_practices_parent_id_idx" ON "about_page_practices" USING btree ("_parent_id");
  CREATE INDEX "about_page_pillars_order_idx" ON "about_page_pillars" USING btree ("_order");
  CREATE INDEX "about_page_pillars_parent_id_idx" ON "about_page_pillars" USING btree ("_parent_id");
  CREATE INDEX "about_page_engagement_order_idx" ON "about_page_engagement" USING btree ("_order");
  CREATE INDEX "about_page_engagement_parent_id_idx" ON "about_page_engagement" USING btree ("_parent_id");
  CREATE INDEX "about_page_ceo_photo_idx" ON "about_page" USING btree ("ceo_photo_id");
  CREATE INDEX "about_page_seo_seo_image_idx" ON "about_page" USING btree ("seo_image_id");
  CREATE INDEX "about_page__status_idx" ON "about_page" USING btree ("_status");
  CREATE INDEX "_about_page_v_version_practices_order_idx" ON "_about_page_v_version_practices" USING btree ("_order");
  CREATE INDEX "_about_page_v_version_practices_parent_id_idx" ON "_about_page_v_version_practices" USING btree ("_parent_id");
  CREATE INDEX "_about_page_v_version_pillars_order_idx" ON "_about_page_v_version_pillars" USING btree ("_order");
  CREATE INDEX "_about_page_v_version_pillars_parent_id_idx" ON "_about_page_v_version_pillars" USING btree ("_parent_id");
  CREATE INDEX "_about_page_v_version_engagement_order_idx" ON "_about_page_v_version_engagement" USING btree ("_order");
  CREATE INDEX "_about_page_v_version_engagement_parent_id_idx" ON "_about_page_v_version_engagement" USING btree ("_parent_id");
  CREATE INDEX "_about_page_v_version_version_ceo_photo_idx" ON "_about_page_v" USING btree ("version_ceo_photo_id");
  CREATE INDEX "_about_page_v_version_seo_version_seo_image_idx" ON "_about_page_v" USING btree ("version_seo_image_id");
  CREATE INDEX "_about_page_v_version_version__status_idx" ON "_about_page_v" USING btree ("version__status");
  CREATE INDEX "_about_page_v_created_at_idx" ON "_about_page_v" USING btree ("created_at");
  CREATE INDEX "_about_page_v_updated_at_idx" ON "_about_page_v" USING btree ("updated_at");
  CREATE INDEX "_about_page_v_latest_idx" ON "_about_page_v" USING btree ("latest");
  CREATE INDEX "_about_page_v_autosave_idx" ON "_about_page_v" USING btree ("autosave");
  CREATE INDEX "ai_page_features_order_idx" ON "ai_page_features" USING btree ("_order");
  CREATE INDEX "ai_page_features_parent_id_idx" ON "ai_page_features" USING btree ("_parent_id");
  CREATE INDEX "ai_page_benefits_order_idx" ON "ai_page_benefits" USING btree ("_order");
  CREATE INDEX "ai_page_benefits_parent_id_idx" ON "ai_page_benefits" USING btree ("_parent_id");
  CREATE INDEX "ai_page_audiences_order_idx" ON "ai_page_audiences" USING btree ("_order");
  CREATE INDEX "ai_page_audiences_parent_id_idx" ON "ai_page_audiences" USING btree ("_parent_id");
  CREATE INDEX "ai_page_faqs_order_idx" ON "ai_page_faqs" USING btree ("_order");
  CREATE INDEX "ai_page_faqs_parent_id_idx" ON "ai_page_faqs" USING btree ("_parent_id");
  CREATE INDEX "ai_page_seo_seo_image_idx" ON "ai_page" USING btree ("seo_image_id");
  CREATE INDEX "ai_page__status_idx" ON "ai_page" USING btree ("_status");
  CREATE INDEX "_ai_page_v_version_features_order_idx" ON "_ai_page_v_version_features" USING btree ("_order");
  CREATE INDEX "_ai_page_v_version_features_parent_id_idx" ON "_ai_page_v_version_features" USING btree ("_parent_id");
  CREATE INDEX "_ai_page_v_version_benefits_order_idx" ON "_ai_page_v_version_benefits" USING btree ("_order");
  CREATE INDEX "_ai_page_v_version_benefits_parent_id_idx" ON "_ai_page_v_version_benefits" USING btree ("_parent_id");
  CREATE INDEX "_ai_page_v_version_audiences_order_idx" ON "_ai_page_v_version_audiences" USING btree ("_order");
  CREATE INDEX "_ai_page_v_version_audiences_parent_id_idx" ON "_ai_page_v_version_audiences" USING btree ("_parent_id");
  CREATE INDEX "_ai_page_v_version_faqs_order_idx" ON "_ai_page_v_version_faqs" USING btree ("_order");
  CREATE INDEX "_ai_page_v_version_faqs_parent_id_idx" ON "_ai_page_v_version_faqs" USING btree ("_parent_id");
  CREATE INDEX "_ai_page_v_version_seo_version_seo_image_idx" ON "_ai_page_v" USING btree ("version_seo_image_id");
  CREATE INDEX "_ai_page_v_version_version__status_idx" ON "_ai_page_v" USING btree ("version__status");
  CREATE INDEX "_ai_page_v_created_at_idx" ON "_ai_page_v" USING btree ("created_at");
  CREATE INDEX "_ai_page_v_updated_at_idx" ON "_ai_page_v" USING btree ("updated_at");
  CREATE INDEX "_ai_page_v_latest_idx" ON "_ai_page_v" USING btree ("latest");
  CREATE INDEX "_ai_page_v_autosave_idx" ON "_ai_page_v" USING btree ("autosave");
  CREATE INDEX "careers_page_seo_seo_image_idx" ON "careers_page" USING btree ("seo_image_id");
  CREATE INDEX "careers_page__status_idx" ON "careers_page" USING btree ("_status");
  CREATE INDEX "_careers_page_v_version_seo_version_seo_image_idx" ON "_careers_page_v" USING btree ("version_seo_image_id");
  CREATE INDEX "_careers_page_v_version_version__status_idx" ON "_careers_page_v" USING btree ("version__status");
  CREATE INDEX "_careers_page_v_created_at_idx" ON "_careers_page_v" USING btree ("created_at");
  CREATE INDEX "_careers_page_v_updated_at_idx" ON "_careers_page_v" USING btree ("updated_at");
  CREATE INDEX "_careers_page_v_latest_idx" ON "_careers_page_v" USING btree ("latest");
  CREATE INDEX "_careers_page_v_autosave_idx" ON "_careers_page_v" USING btree ("autosave");
  CREATE INDEX "partner_page_why_order_idx" ON "partner_page_why" USING btree ("_order");
  CREATE INDEX "partner_page_why_parent_id_idx" ON "partner_page_why" USING btree ("_parent_id");
  CREATE INDEX "partner_page_seo_seo_image_idx" ON "partner_page" USING btree ("seo_image_id");
  CREATE INDEX "partner_page__status_idx" ON "partner_page" USING btree ("_status");
  CREATE INDEX "_partner_page_v_version_why_order_idx" ON "_partner_page_v_version_why" USING btree ("_order");
  CREATE INDEX "_partner_page_v_version_why_parent_id_idx" ON "_partner_page_v_version_why" USING btree ("_parent_id");
  CREATE INDEX "_partner_page_v_version_seo_version_seo_image_idx" ON "_partner_page_v" USING btree ("version_seo_image_id");
  CREATE INDEX "_partner_page_v_version_version__status_idx" ON "_partner_page_v" USING btree ("version__status");
  CREATE INDEX "_partner_page_v_created_at_idx" ON "_partner_page_v" USING btree ("created_at");
  CREATE INDEX "_partner_page_v_updated_at_idx" ON "_partner_page_v" USING btree ("updated_at");
  CREATE INDEX "_partner_page_v_latest_idx" ON "_partner_page_v" USING btree ("latest");
  CREATE INDEX "_partner_page_v_autosave_idx" ON "_partner_page_v" USING btree ("autosave");
  CREATE INDEX "contact_page_seo_seo_image_idx" ON "contact_page" USING btree ("seo_image_id");
  CREATE INDEX "contact_page__status_idx" ON "contact_page" USING btree ("_status");
  CREATE INDEX "_contact_page_v_version_seo_version_seo_image_idx" ON "_contact_page_v" USING btree ("version_seo_image_id");
  CREATE INDEX "_contact_page_v_version_version__status_idx" ON "_contact_page_v" USING btree ("version__status");
  CREATE INDEX "_contact_page_v_created_at_idx" ON "_contact_page_v" USING btree ("created_at");
  CREATE INDEX "_contact_page_v_updated_at_idx" ON "_contact_page_v" USING btree ("updated_at");
  CREATE INDEX "_contact_page_v_latest_idx" ON "_contact_page_v" USING btree ("latest");
  CREATE INDEX "_contact_page_v_autosave_idx" ON "_contact_page_v" USING btree ("autosave");
  CREATE INDEX "demo_page_seo_seo_image_idx" ON "demo_page" USING btree ("seo_image_id");
  CREATE INDEX "demo_page__status_idx" ON "demo_page" USING btree ("_status");
  CREATE INDEX "_demo_page_v_version_seo_version_seo_image_idx" ON "_demo_page_v" USING btree ("version_seo_image_id");
  CREATE INDEX "_demo_page_v_version_version__status_idx" ON "_demo_page_v" USING btree ("version__status");
  CREATE INDEX "_demo_page_v_created_at_idx" ON "_demo_page_v" USING btree ("created_at");
  CREATE INDEX "_demo_page_v_updated_at_idx" ON "_demo_page_v" USING btree ("updated_at");
  CREATE INDEX "_demo_page_v_latest_idx" ON "_demo_page_v" USING btree ("latest");
  CREATE INDEX "_demo_page_v_autosave_idx" ON "_demo_page_v" USING btree ("autosave");
  CREATE INDEX "site_settings_stats_order_idx" ON "site_settings_stats" USING btree ("_order");
  CREATE INDEX "site_settings_stats_parent_id_idx" ON "site_settings_stats" USING btree ("_parent_id");
  CREATE INDEX "site_settings_social_order_idx" ON "site_settings_social" USING btree ("_order");
  CREATE INDEX "site_settings_social_parent_id_idx" ON "site_settings_social" USING btree ("_parent_id");
  CREATE INDEX "site_settings_footer_countries_order_idx" ON "site_settings_footer_countries" USING btree ("_order");
  CREATE INDEX "site_settings_footer_countries_parent_id_idx" ON "site_settings_footer_countries" USING btree ("_parent_id");
  CREATE INDEX "site_settings_trust_order_idx" ON "site_settings_trust" USING btree ("_order");
  CREATE INDEX "site_settings_trust_parent_id_idx" ON "site_settings_trust" USING btree ("_parent_id");
  CREATE INDEX "site_settings_trust_image_idx" ON "site_settings_trust" USING btree ("image_id");
  CREATE INDEX "site_settings_brochure_brochure_file_idx" ON "site_settings" USING btree ("brochure_file_id");
  CREATE INDEX "navigation_footer_columns_links_order_idx" ON "navigation_footer_columns_links" USING btree ("_order");
  CREATE INDEX "navigation_footer_columns_links_parent_id_idx" ON "navigation_footer_columns_links" USING btree ("_parent_id");
  CREATE INDEX "navigation_footer_columns_order_idx" ON "navigation_footer_columns" USING btree ("_order");
  CREATE INDEX "navigation_footer_columns_parent_id_idx" ON "navigation_footer_columns" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "products_hero_flow" CASCADE;
  DROP TABLE "products_features" CASCADE;
  DROP TABLE "products_roles" CASCADE;
  DROP TABLE "products_benefits" CASCADE;
  DROP TABLE "products_faqs" CASCADE;
  DROP TABLE "products_problems" CASCADE;
  DROP TABLE "products_quick_steps" CASCADE;
  DROP TABLE "products_modes" CASCADE;
  DROP TABLE "products_reports_stats" CASCADE;
  DROP TABLE "products_reports" CASCADE;
  DROP TABLE "products_compare_rows" CASCADE;
  DROP TABLE "products" CASCADE;
  DROP TABLE "products_rels" CASCADE;
  DROP TABLE "_products_v_version_hero_flow" CASCADE;
  DROP TABLE "_products_v_version_features" CASCADE;
  DROP TABLE "_products_v_version_roles" CASCADE;
  DROP TABLE "_products_v_version_benefits" CASCADE;
  DROP TABLE "_products_v_version_faqs" CASCADE;
  DROP TABLE "_products_v_version_problems" CASCADE;
  DROP TABLE "_products_v_version_quick_steps" CASCADE;
  DROP TABLE "_products_v_version_modes" CASCADE;
  DROP TABLE "_products_v_version_reports_stats" CASCADE;
  DROP TABLE "_products_v_version_reports" CASCADE;
  DROP TABLE "_products_v_version_compare_rows" CASCADE;
  DROP TABLE "_products_v" CASCADE;
  DROP TABLE "_products_v_rels" CASCADE;
  DROP TABLE "solutions_capabilities" CASCADE;
  DROP TABLE "solutions_faqs" CASCADE;
  DROP TABLE "solutions" CASCADE;
  DROP TABLE "solutions_rels" CASCADE;
  DROP TABLE "_solutions_v_version_capabilities" CASCADE;
  DROP TABLE "_solutions_v_version_faqs" CASCADE;
  DROP TABLE "_solutions_v" CASCADE;
  DROP TABLE "_solutions_v_rels" CASCADE;
  DROP TABLE "industries_pains" CASCADE;
  DROP TABLE "industries_faqs" CASCADE;
  DROP TABLE "industries" CASCADE;
  DROP TABLE "industries_rels" CASCADE;
  DROP TABLE "_industries_v_version_pains" CASCADE;
  DROP TABLE "_industries_v_version_faqs" CASCADE;
  DROP TABLE "_industries_v" CASCADE;
  DROP TABLE "_industries_v_rels" CASCADE;
  DROP TABLE "countries_points" CASCADE;
  DROP TABLE "countries_faqs" CASCADE;
  DROP TABLE "countries" CASCADE;
  DROP TABLE "countries_rels" CASCADE;
  DROP TABLE "_countries_v_version_points" CASCADE;
  DROP TABLE "_countries_v_version_faqs" CASCADE;
  DROP TABLE "_countries_v" CASCADE;
  DROP TABLE "_countries_v_rels" CASCADE;
  DROP TABLE "cities_faqs" CASCADE;
  DROP TABLE "cities" CASCADE;
  DROP TABLE "cities_rels" CASCADE;
  DROP TABLE "_cities_v_version_faqs" CASCADE;
  DROP TABLE "_cities_v" CASCADE;
  DROP TABLE "_cities_v_rels" CASCADE;
  DROP TABLE "case_studies_results" CASCADE;
  DROP TABLE "case_studies" CASCADE;
  DROP TABLE "_case_studies_v_version_results" CASCADE;
  DROP TABLE "_case_studies_v" CASCADE;
  DROP TABLE "clients" CASCADE;
  DROP TABLE "_clients_v" CASCADE;
  DROP TABLE "testimonials" CASCADE;
  DROP TABLE "testimonials_rels" CASCADE;
  DROP TABLE "_testimonials_v" CASCADE;
  DROP TABLE "_testimonials_v_rels" CASCADE;
  DROP TABLE "posts_faqs" CASCADE;
  DROP TABLE "posts" CASCADE;
  DROP TABLE "_posts_v_version_faqs" CASCADE;
  DROP TABLE "_posts_v" CASCADE;
  DROP TABLE "categories" CASCADE;
  DROP TABLE "glossary" CASCADE;
  DROP TABLE "glossary_rels" CASCADE;
  DROP TABLE "_glossary_v" CASCADE;
  DROP TABLE "_glossary_v_rels" CASCADE;
  DROP TABLE "jobs" CASCADE;
  DROP TABLE "_jobs_v" CASCADE;
  DROP TABLE "legal" CASCADE;
  DROP TABLE "_legal_v" CASCADE;
  DROP TABLE "leads" CASCADE;
  DROP TABLE "bookings" CASCADE;
  DROP TABLE "job_applications" CASCADE;
  DROP TABLE "resumes" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "documents" CASCADE;
  DROP TABLE "redirects" CASCADE;
  DROP TABLE "users_modules" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "home_page_problem_stages" CASCADE;
  DROP TABLE "home_page_route" CASCADE;
  DROP TABLE "home_page_across" CASCADE;
  DROP TABLE "home_page_ai_points" CASCADE;
  DROP TABLE "home_page_why" CASCADE;
  DROP TABLE "home_page_faqs" CASCADE;
  DROP TABLE "home_page" CASCADE;
  DROP TABLE "_home_page_v_version_problem_stages" CASCADE;
  DROP TABLE "_home_page_v_version_route" CASCADE;
  DROP TABLE "_home_page_v_version_across" CASCADE;
  DROP TABLE "_home_page_v_version_ai_points" CASCADE;
  DROP TABLE "_home_page_v_version_why" CASCADE;
  DROP TABLE "_home_page_v_version_faqs" CASCADE;
  DROP TABLE "_home_page_v" CASCADE;
  DROP TABLE "about_page_practices" CASCADE;
  DROP TABLE "about_page_pillars" CASCADE;
  DROP TABLE "about_page_engagement" CASCADE;
  DROP TABLE "about_page" CASCADE;
  DROP TABLE "_about_page_v_version_practices" CASCADE;
  DROP TABLE "_about_page_v_version_pillars" CASCADE;
  DROP TABLE "_about_page_v_version_engagement" CASCADE;
  DROP TABLE "_about_page_v" CASCADE;
  DROP TABLE "ai_page_features" CASCADE;
  DROP TABLE "ai_page_benefits" CASCADE;
  DROP TABLE "ai_page_audiences" CASCADE;
  DROP TABLE "ai_page_faqs" CASCADE;
  DROP TABLE "ai_page" CASCADE;
  DROP TABLE "_ai_page_v_version_features" CASCADE;
  DROP TABLE "_ai_page_v_version_benefits" CASCADE;
  DROP TABLE "_ai_page_v_version_audiences" CASCADE;
  DROP TABLE "_ai_page_v_version_faqs" CASCADE;
  DROP TABLE "_ai_page_v" CASCADE;
  DROP TABLE "careers_page" CASCADE;
  DROP TABLE "_careers_page_v" CASCADE;
  DROP TABLE "partner_page_why" CASCADE;
  DROP TABLE "partner_page" CASCADE;
  DROP TABLE "_partner_page_v_version_why" CASCADE;
  DROP TABLE "_partner_page_v" CASCADE;
  DROP TABLE "contact_page" CASCADE;
  DROP TABLE "_contact_page_v" CASCADE;
  DROP TABLE "demo_page" CASCADE;
  DROP TABLE "_demo_page_v" CASCADE;
  DROP TABLE "site_settings_stats" CASCADE;
  DROP TABLE "site_settings_social" CASCADE;
  DROP TABLE "site_settings_footer_countries" CASCADE;
  DROP TABLE "site_settings_trust" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "navigation_footer_columns_links" CASCADE;
  DROP TABLE "navigation_footer_columns" CASCADE;
  DROP TABLE "navigation" CASCADE;
  DROP TYPE "public"."enum_products_features_icon";
  DROP TYPE "public"."enum_products_audience";
  DROP TYPE "public"."enum_products_status";
  DROP TYPE "public"."enum__products_v_version_features_icon";
  DROP TYPE "public"."enum__products_v_version_audience";
  DROP TYPE "public"."enum__products_v_version_status";
  DROP TYPE "public"."enum_solutions_capabilities_icon";
  DROP TYPE "public"."enum_solutions_status";
  DROP TYPE "public"."enum__solutions_v_version_capabilities_icon";
  DROP TYPE "public"."enum__solutions_v_version_status";
  DROP TYPE "public"."enum_industries_pains_icon";
  DROP TYPE "public"."enum_industries_status";
  DROP TYPE "public"."enum__industries_v_version_pains_icon";
  DROP TYPE "public"."enum__industries_v_version_status";
  DROP TYPE "public"."enum_countries_points_icon";
  DROP TYPE "public"."enum_countries_status";
  DROP TYPE "public"."enum__countries_v_version_points_icon";
  DROP TYPE "public"."enum__countries_v_version_status";
  DROP TYPE "public"."enum_cities_status";
  DROP TYPE "public"."enum__cities_v_version_status";
  DROP TYPE "public"."enum_case_studies_status";
  DROP TYPE "public"."enum__case_studies_v_version_status";
  DROP TYPE "public"."enum_clients_status";
  DROP TYPE "public"."enum__clients_v_version_status";
  DROP TYPE "public"."enum_testimonials_status";
  DROP TYPE "public"."enum__testimonials_v_version_status";
  DROP TYPE "public"."enum_posts_status";
  DROP TYPE "public"."enum__posts_v_version_status";
  DROP TYPE "public"."enum_glossary_status";
  DROP TYPE "public"."enum__glossary_v_version_status";
  DROP TYPE "public"."enum_jobs_type";
  DROP TYPE "public"."enum_jobs_status";
  DROP TYPE "public"."enum__jobs_v_version_type";
  DROP TYPE "public"."enum__jobs_v_version_status";
  DROP TYPE "public"."enum_legal_status";
  DROP TYPE "public"."enum__legal_v_version_status";
  DROP TYPE "public"."enum_leads_type";
  DROP TYPE "public"."enum_leads_status";
  DROP TYPE "public"."enum_bookings_status";
  DROP TYPE "public"."enum_job_applications_status";
  DROP TYPE "public"."enum_users_modules";
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_home_page_problem_stages_icon";
  DROP TYPE "public"."enum_home_page_ai_points_icon";
  DROP TYPE "public"."enum_home_page_why_icon";
  DROP TYPE "public"."enum_home_page_status";
  DROP TYPE "public"."enum__home_page_v_version_problem_stages_icon";
  DROP TYPE "public"."enum__home_page_v_version_ai_points_icon";
  DROP TYPE "public"."enum__home_page_v_version_why_icon";
  DROP TYPE "public"."enum__home_page_v_version_status";
  DROP TYPE "public"."enum_about_page_practices_icon";
  DROP TYPE "public"."enum_about_page_pillars_icon";
  DROP TYPE "public"."enum_about_page_engagement_icon";
  DROP TYPE "public"."enum_about_page_status";
  DROP TYPE "public"."enum__about_page_v_version_practices_icon";
  DROP TYPE "public"."enum__about_page_v_version_pillars_icon";
  DROP TYPE "public"."enum__about_page_v_version_engagement_icon";
  DROP TYPE "public"."enum__about_page_v_version_status";
  DROP TYPE "public"."enum_ai_page_benefits_icon";
  DROP TYPE "public"."enum_ai_page_audiences_icon";
  DROP TYPE "public"."enum_ai_page_status";
  DROP TYPE "public"."enum__ai_page_v_version_benefits_icon";
  DROP TYPE "public"."enum__ai_page_v_version_audiences_icon";
  DROP TYPE "public"."enum__ai_page_v_version_status";
  DROP TYPE "public"."enum_careers_page_status";
  DROP TYPE "public"."enum__careers_page_v_version_status";
  DROP TYPE "public"."enum_partner_page_status";
  DROP TYPE "public"."enum__partner_page_v_version_status";
  DROP TYPE "public"."enum_contact_page_status";
  DROP TYPE "public"."enum__contact_page_v_version_status";
  DROP TYPE "public"."enum_demo_page_status";
  DROP TYPE "public"."enum__demo_page_v_version_status";
  DROP TYPE "public"."enum_site_settings_social_label";`)
}
