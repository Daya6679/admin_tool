import { test, expect } from '@playwright/test';

test('Page loads and displays title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('Admin Tool - Students');
  await expect(page.locator('h1')).toHaveText('Student Admin Tool');
});

test('Add a new student', async ({ page }) => {
  await page.goto('/');
  await page.waitForSelector('#name');
  const uniqueName = `John Doe ${Date.now()}`;
  await page.fill('#name', uniqueName);
  await page.fill('#class', '10A');
  await page.fill('#phone', '1234567890');
  await page.fill('#mentorName', 'Mr. Smith');
  await page.fill('#street', '123 Main St');
  await page.fill('#city', 'Anytown');
  await page.fill('#state', 'CA');
  await page.fill('#zip', '12345');
  await page.click('button[type="submit"]');
  await expect(page.locator('#studentsTable tbody')).toContainText(uniqueName);
});

test('Edit an existing student', async ({ page }) => {
  await page.goto('/');
  await page.waitForSelector('#name');
  // First add a student
  const uniqueName = `Jane Doe ${Date.now()}`;
  const updatedName = `Jane Smith ${Date.now()}`;
  await page.fill('#name', uniqueName);
  await page.fill('#class', '10B');
  await page.fill('#phone', '0987654321');
  await page.fill('#mentorName', 'Ms. Johnson');
  await page.fill('#street', '456 Elm St');
  await page.fill('#city', 'Othertown');
  await page.fill('#state', 'NY');
  await page.fill('#zip', '67890');
  await page.click('button[type="submit"]');
  // Now edit the newly added one
  await page.locator('#studentsTable tbody tr').last().locator('text=Edit').click();
  await page.fill('#editName', updatedName);
  await page.fill('#editClass', '10C');
  await page.fill('#editPhone', '1111111111');
  await page.fill('#editMentorName', 'Ms. Johnson');
  await page.fill('#editStreet', '789 Oak St');
  await page.fill('#editCity', 'Newtown');
  await page.fill('#editState', 'TX');
  await page.fill('#editZip', '54321');
  await page.click('#editForm button[type="submit"]');
  await expect(page.locator('#studentsTable tbody')).toContainText(updatedName);
});

test('Delete a student', async ({ page }) => {
  await page.goto('/');
  await page.waitForSelector('#name');
  // Add a student
  const uniqueName = `Bob Wilson ${Date.now()}`;
  await page.fill('#name', uniqueName);
  await page.fill('#class', '9A');
  await page.fill('#phone', '2222222222');
  await page.fill('#mentorName', 'Mr. Brown');
  await page.fill('#street', '321 Pine St');
  await page.fill('#city', 'Smalltown');
  await page.fill('#state', 'FL');
  await page.fill('#zip', '98765');
  await page.click('button[type="submit"]');
  await expect(page.locator('#studentsTable tbody')).toContainText(uniqueName);
  // Delete the last one
  page.on('dialog', dialog => dialog.accept());
  await page.locator('#studentsTable tbody tr').last().locator('text=Delete').click();
  await expect(page.locator('#studentsTable tbody')).not.toContainText(uniqueName);
});