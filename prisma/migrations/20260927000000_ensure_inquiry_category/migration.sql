DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_name = 'Inquiry'
      AND column_name = 'category'
  ) THEN
    ALTER TABLE "Inquiry" ADD COLUMN "category" TEXT;
  END IF;
END $$;
