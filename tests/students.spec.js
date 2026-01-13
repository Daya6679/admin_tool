import { test, expect } from '@playwright/test';

test('Page loads and displays title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('Admin Tool - Students');
  await expect(page.locator('h1')).toHaveText('Student Admin Tool');
});

test('Add a new student', async ({ page }) => {
  await page.goto('/');
  const uniqueName = `John Doe ${Date.now()}`;
  await page.fill('#name', uniqueName);
  await page.fill('#class', '10A');
  await page.fill('#phone', '1234567890');
  await page.fill('#mentorName', 'Mr. Smith');
  await page.click('button[type="submit"]');
  await expect(page.locator('#studentsTable tbody')).toContainText(uniqueName);
});

test('Edit an existing student', async ({ page }) => {
  await page.goto('/');
  // First add a student
  const uniqueName = `Jane Doe ${Date.now()}`;
  const updatedName = `Jane Smith ${Date.now()}`;
  await page.fill('#name', uniqueName);
  await page.fill('#class', '10B');
  await page.fill('#phone', '0987654321');
  await page.fill('#mentorName', 'Ms. Johnson');
  await page.click('button[type="submit"]');
  // Now edit the newly added one
  await page.locator('#studentsTable tbody tr').last().locator('text=Edit').click();
  await page.fill('#editName', updatedName);
  await page.fill('#editClass', '10C');
  await page.fill('#editPhone', '1111111111');
  await page.fill('#editMentorName', 'Ms. Johnson');
  await page.click('#editForm button[type="submit"]');
  await expect(page.locator('#studentsTable tbody')).toContainText(updatedName);
});

test('Delete a student', async ({ page }) => {
  await page.goto('/');
  // Add a student
  const uniqueName = `Bob Wilson ${Date.now()}`;
  await page.fill('#name', uniqueName);
  await page.fill('#class', '9A');
  await page.fill('#phone', '2222222222');
  await page.fill('#mentorName', 'Mr. Brown');
  await page.click('button[type="submit"]');
  await expect(page.locator('#studentsTable tbody')).toContainText(uniqueName);
  // Delete the last one
  page.on('dialog', dialog => dialog.accept());
  await page.locator('#studentsTable tbody tr').last().locator('text=Delete').click();
  await expect(page.locator('#studentsTable tbody')).not.toContainText(uniqueName);
});