-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contact" (
    "id" TEXT NOT NULL,
    "userid" TEXT NOT NULL,
    "imageurl" TEXT NOT NULL,
    "dob" TIMESTAMP(3) NOT NULL,
    "height" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,
    "contacts" TEXT[],
    "emails" TEXT[],
    "medicalhistory" TEXT[],
    "bloodtype" TEXT NOT NULL,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Contact_userid_key" ON "Contact"("userid");

-- CreateIndex
CREATE UNIQUE INDEX "Contact_imageurl_key" ON "Contact"("imageurl");

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
