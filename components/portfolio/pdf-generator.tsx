"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { X, Download, FileText, Palette, Settings, Eye, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface PDFGeneratorProps {
  achievements: any[]
  studentInfo: any
  onClose: () => void
}

export function PDFGenerator({ achievements, studentInfo, onClose }: PDFGeneratorProps) {
  const { toast } = useToast()
  const [isGenerating, setIsGenerating] = useState(false)
  const [template, setTemplate] = useState("professional")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [customization, setCustomization] = useState({
    includeGPA: true,
    includeSkills: true,
    includeContactInfo: true,
    includeProfileSummary: false,
    colorScheme: "blue",
    fontSize: "medium",
    pageLayout: "single-column",
    profileSummary: "",
    customTitle: "",
  })

  const templates = [
    {
      id: "professional",
      name: "Professional",
      description: "Clean, corporate-style layout perfect for job applications",
      preview: "/professional-resume-template.png",
    },
    {
      id: "academic",
      name: "Academic",
      description: "Research-focused layout highlighting publications and academic achievements",
      preview: "/academic-cv-template.png",
    },
    {
      id: "creative",
      name: "Creative",
      description: "Modern, visually appealing design for creative industries",
      preview: "/creative-portfolio-template.png",
    },
    {
      id: "minimal",
      name: "Minimal",
      description: "Simple, clean design focusing on content over decoration",
      preview: "/minimal-resume-template.png",
    },
  ]

  const colorSchemes = [
    { id: "blue", name: "Professional Blue", color: "#2563eb" },
    { id: "green", name: "Success Green", color: "#16a34a" },
    { id: "purple", name: "Creative Purple", color: "#9333ea" },
    { id: "gray", name: "Classic Gray", color: "#6b7280" },
    { id: "red", name: "Bold Red", color: "#dc2626" },
  ]

  const categories = [...new Set(achievements.map((a) => a.category))]

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const handleCustomizationChange = (key: string, value: any) => {
    setCustomization((prev) => ({ ...prev, [key]: value }))
  }

  const generatePDF = async () => {
    setIsGenerating(true)

    try {
      // Simulate PDF generation process
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // In a real implementation, this would:
      // 1. Send data to a PDF generation service
      // 2. Use libraries like jsPDF, Puppeteer, or a server-side solution
      // 3. Apply the selected template and customizations
      // 4. Generate and download the PDF

      const filteredAchievements =
        selectedCategories.length > 0
          ? achievements.filter((a) => selectedCategories.includes(a.category))
          : achievements

      const pdfData = {
        template,
        customization,
        studentInfo,
        achievements: filteredAchievements,
        generatedAt: new Date().toISOString(),
      }

      // Mock PDF download
      const blob = new Blob([JSON.stringify(pdfData, null, 2)], { type: "application/json" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${studentInfo.name.replace(/\s+/g, "_")}_Portfolio_${template}.pdf`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      toast({
        title: "Portfolio Generated Successfully!",
        description: `Your ${template} portfolio has been downloaded as a PDF.`,
      })

      onClose()
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "There was an error generating your portfolio. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const previewPDF = () => {
    toast({
      title: "Preview Generated",
      description: "Opening portfolio preview in new window...",
    })
    // In real implementation, this would open a preview window
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-background rounded-lg w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold">Generate Portfolio PDF</h2>
            <p className="text-muted-foreground">Create a professional PDF portfolio for job applications</p>
          </div>
          <Button variant="ghost" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Template Selection */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Choose Template
                  </CardTitle>
                  <CardDescription>Select a template that best fits your career goals</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {templates.map((tmpl) => (
                      <div
                        key={tmpl.id}
                        className={`border rounded-lg p-4 cursor-pointer transition-all ${
                          template === tmpl.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                        }`}
                        onClick={() => setTemplate(tmpl.id)}
                      >
                        <div className="aspect-[3/4] bg-muted rounded mb-3 flex items-center justify-center">
                          <img
                            src={tmpl.preview || "/placeholder.svg"}
                            alt={`${tmpl.name} template preview`}
                            className="w-full h-full object-cover rounded"
                          />
                        </div>
                        <h3 className="font-semibold mb-1">{tmpl.name}</h3>
                        <p className="text-sm text-muted-foreground">{tmpl.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Content Selection */}
              <Card>
                <CardHeader>
                  <CardTitle>Content Selection</CardTitle>
                  <CardDescription>Choose which achievements to include in your portfolio</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-base font-medium">Achievement Categories</Label>
                    <p className="text-sm text-muted-foreground mb-3">
                      Select specific categories or leave empty to include all
                    </p>
                    <div className="grid md:grid-cols-2 gap-3">
                      {categories.map((category) => (
                        <div key={category} className="flex items-center space-x-2">
                          <Checkbox
                            id={category}
                            checked={selectedCategories.includes(category)}
                            onCheckedChange={() => handleCategoryToggle(category)}
                          />
                          <label htmlFor={category} className="text-sm">
                            {category} ({achievements.filter((a) => a.category === category).length})
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="includeGPA"
                        checked={customization.includeGPA}
                        onCheckedChange={(checked) => handleCustomizationChange("includeGPA", checked)}
                      />
                      <label htmlFor="includeGPA" className="text-sm">
                        Include GPA
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="includeSkills"
                        checked={customization.includeSkills}
                        onCheckedChange={(checked) => handleCustomizationChange("includeSkills", checked)}
                      />
                      <label htmlFor="includeSkills" className="text-sm">
                        Include Skills Section
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="includeContactInfo"
                        checked={customization.includeContactInfo}
                        onCheckedChange={(checked) => handleCustomizationChange("includeContactInfo", checked)}
                      />
                      <label htmlFor="includeContactInfo" className="text-sm">
                        Include Contact Information
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="includeProfileSummary"
                        checked={customization.includeProfileSummary}
                        onCheckedChange={(checked) => handleCustomizationChange("includeProfileSummary", checked)}
                      />
                      <label htmlFor="includeProfileSummary" className="text-sm">
                        Include Profile Summary
                      </label>
                    </div>
                  </div>

                  {customization.includeProfileSummary && (
                    <div>
                      <Label htmlFor="profileSummary">Profile Summary</Label>
                      <Textarea
                        id="profileSummary"
                        placeholder="Write a brief professional summary about yourself..."
                        value={customization.profileSummary}
                        onChange={(e) => handleCustomizationChange("profileSummary", e.target.value)}
                        rows={3}
                        className="mt-2"
                      />
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Customization */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="h-5 w-5" />
                    Customization
                  </CardTitle>
                  <CardDescription>Personalize the appearance of your portfolio</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="customTitle">Custom Title (Optional)</Label>
                    <Input
                      id="customTitle"
                      placeholder="e.g., Software Engineering Portfolio"
                      value={customization.customTitle}
                      onChange={(e) => handleCustomizationChange("customTitle", e.target.value)}
                      className="mt-2"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label>Color Scheme</Label>
                      <Select
                        value={customization.colorScheme}
                        onValueChange={(value) => handleCustomizationChange("colorScheme", value)}
                      >
                        <SelectTrigger className="mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {colorSchemes.map((scheme) => (
                            <SelectItem key={scheme.id} value={scheme.id}>
                              <div className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded" style={{ backgroundColor: scheme.color }} />
                                {scheme.name}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Font Size</Label>
                      <Select
                        value={customization.fontSize}
                        onValueChange={(value) => handleCustomizationChange("fontSize", value)}
                      >
                        <SelectTrigger className="mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="small">Small</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="large">Large</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label>Page Layout</Label>
                    <Select
                      value={customization.pageLayout}
                      onValueChange={(value) => handleCustomizationChange("pageLayout", value)}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="single-column">Single Column</SelectItem>
                        <SelectItem value="two-column">Two Column</SelectItem>
                        <SelectItem value="sidebar">Sidebar Layout</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Preview */}
              <Card>
                <CardHeader>
                  <CardTitle>Portfolio Preview</CardTitle>
                  <CardDescription>Preview how your portfolio will look</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-[3/4] bg-muted rounded-lg flex items-center justify-center mb-4">
                    <div className="text-center">
                      <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">Preview will appear here</p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full bg-transparent" onClick={previewPDF}>
                    <Eye className="h-4 w-4 mr-2" />
                    Preview PDF
                  </Button>
                </CardContent>
              </Card>

              {/* Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Generation Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Template:</span>
                    <Badge variant="outline">{templates.find((t) => t.id === template)?.name}</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Achievements:</span>
                    <span>
                      {selectedCategories.length > 0
                        ? achievements.filter((a) => selectedCategories.includes(a.category)).length
                        : achievements.length}{" "}
                      items
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Color Scheme:</span>
                    <div className="flex items-center gap-1">
                      <div
                        className="w-3 h-3 rounded"
                        style={{ backgroundColor: colorSchemes.find((c) => c.id === customization.colorScheme)?.color }}
                      />
                      <span className="text-xs">
                        {colorSchemes.find((c) => c.id === customization.colorScheme)?.name}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Layout:</span>
                    <span className="capitalize">{customization.pageLayout.replace("-", " ")}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full" onClick={generatePDF} disabled={isGenerating}>
                    {isGenerating ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Generating PDF...
                      </>
                    ) : (
                      <>
                        <Download className="h-4 w-4 mr-2" />
                        Generate & Download PDF
                      </>
                    )}
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent" onClick={previewPDF}>
                    <Eye className="h-4 w-4 mr-2" />
                    Preview First
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    PDF will be generated with your current settings and downloaded automatically.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
